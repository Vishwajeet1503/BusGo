const crypto = require("crypto");
const pool = require("../db/database");

const createBooking = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.userId;

    const {
      scheduleId,
      travelDate,
      boardingPointId,
      droppingPointId,
      passengers,
      paymentMethod,
      contactDetails,
    } = req.body;

    // --------------------------------------------------
    // 1. Basic request validation
    // --------------------------------------------------

    if (
      !scheduleId ||
      !travelDate ||
      !boardingPointId ||
      !droppingPointId ||
      !Array.isArray(passengers) ||
      passengers.length === 0 ||
      !paymentMethod ||
      !contactDetails
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking information",
      });
    }

    // --------------------------------------------------
    // 2. Validate payment method
    // --------------------------------------------------

    const allowedPaymentMethods = ["UPI", "CARD", "NET_BANKING"];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // --------------------------------------------------
    // 3. Validate contact details
    // --------------------------------------------------

    const whatsapp = String(contactDetails.whatsapp || "").trim();

    const email = String(contactDetails.email || "").trim();

    if (!/^[6-9]\d{9}$/.test(whatsapp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid WhatsApp number",
      });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // --------------------------------------------------
    // 4. Validate passenger data
    // --------------------------------------------------

    const seatIds = passengers.map((passenger) => Number(passenger.seatId));

    // Prevent duplicate seats in the same request
    const uniqueSeatIds = new Set(seatIds);

    if (uniqueSeatIds.size !== seatIds.length) {
      return res.status(400).json({
        success: false,
        message: "The same seat cannot be selected twice",
      });
    }

    for (const passenger of passengers) {
      if (
        !passenger.seatId ||
        !passenger.name ||
        !passenger.age ||
        !passenger.gender
      ) {
        return res.status(400).json({
          success: false,
          message: "Incomplete passenger information",
        });
      }

      const age = Number(passenger.age);

      if (age < 1 || age > 120) {
        return res.status(400).json({
          success: false,
          message: "Passenger age must be between 1 and 120",
        });
      }

      const allowedGenders = ["MALE", "FEMALE", "OTHER"];

      if (!allowedGenders.includes(passenger.gender)) {
        return res.status(400).json({
          success: false,
          message: "Invalid passenger gender",
        });
      }
    }

    // --------------------------------------------------
    // 5. Validate travel date format
    // --------------------------------------------------

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(travelDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid travel date",
      });
    }

    // --------------------------------------------------
    // 6. START TRANSACTION
    // --------------------------------------------------

    await client.query("BEGIN");

    // --------------------------------------------------
    // 7. Get schedule and its bus
    // --------------------------------------------------

    const scheduleResult = await client.query(
      `
      SELECT
        id,
        bus_id,
        route_id,
        departure_time,
        arrival_time,
        base_price,
        duration_minutes
      FROM bus_schedules
      WHERE id = $1
      FOR SHARE
      `,
      [scheduleId],
    );

    if (scheduleResult.rows.length === 0) {
      throw new Error("Schedule not found");
    }

    const schedule = scheduleResult.rows[0];

    // --------------------------------------------------
    // 8. Verify boarding point belongs to schedule
    // --------------------------------------------------

    const boardingResult = await client.query(
      `
      SELECT id, name, address, departure_time
      FROM boarding_points
      WHERE id = $1
        AND schedule_id = $2
      `,
      [boardingPointId, scheduleId],
    );

    if (boardingResult.rows.length === 0) {
      throw new Error("Invalid boarding point for this schedule");
    }

    // --------------------------------------------------
    // 9. Verify dropping point belongs to schedule
    // --------------------------------------------------

    const droppingResult = await client.query(
      `
      SELECT id, name, address, arrival_time
      FROM dropping_points
      WHERE id = $1
        AND schedule_id = $2
      `,
      [droppingPointId, scheduleId],
    );

    if (droppingResult.rows.length === 0) {
      throw new Error("Invalid dropping point for this schedule");
    }

    // --------------------------------------------------
    // 10. LOCK selected seats
    // --------------------------------------------------

    const seatsResult = await client.query(
      `
      SELECT
        id,
        bus_id,
        seat_number,
        seat_type,
        price
      FROM seats
      WHERE id = ANY($1::integer[])
        AND bus_id = $2
      FOR UPDATE
      `,
      [seatIds, schedule.bus_id],
    );

    // Make sure every requested seat exists
    if (seatsResult.rows.length !== seatIds.length) {
      throw new Error("One or more selected seats are invalid");
    }

    // --------------------------------------------------
    // 11. Check whether seats are already booked
    // --------------------------------------------------

    const bookedSeatsResult = await client.query(
      `
      SELECT bp.seat_id
      FROM booking_passengers bp
      INNER JOIN bookings b
        ON b.id = bp.booking_id
      WHERE bp.seat_id = ANY($1::integer[])
        AND b.schedule_id = $2
        AND b.travel_date = $3
        AND b.status = 'CONFIRMED'
      FOR UPDATE OF b
      `,
      [seatIds, scheduleId, travelDate],
    );

    if (bookedSeatsResult.rows.length > 0) {
      const bookedSeatIds = bookedSeatsResult.rows.map((row) => row.seat_id);

      throw new Error(`Seats already booked: ${bookedSeatIds.join(", ")}`);
    }

    // --------------------------------------------------
    // 12. Calculate fare SERVER-SIDE
    // --------------------------------------------------

    const baseFare = seatsResult.rows.reduce(
      (total, seat) => total + Number(seat.price),
      0,
    );

    const gst = Math.round(baseFare * 0.05);

    const discount = baseFare >= 2000 ? 100 : 0;

    const finalAmount = baseFare + gst - discount;

    // --------------------------------------------------
    // 13. Generate references
    // --------------------------------------------------

    const bookingReference = `RB-${crypto
      .randomUUID()
      .replace(/-/g, "")
      .substring(0, 12)
      .toUpperCase()}`;

    const transactionReference = `TXN-${crypto
      .randomUUID()
      .replace(/-/g, "")
      .substring(0, 16)
      .toUpperCase()}`;

    // --------------------------------------------------
    // 14. Create booking
    // --------------------------------------------------

    const bookingResult = await client.query(
      `
      INSERT INTO bookings (
        user_id,
        schedule_id,
        boarding_point_id,
        dropping_point_id,
        whatsapp_number,
        contact_email,
        total_amount,
        status,
        booking_reference,
        travel_date
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        'CONFIRMED',
        $8,
        $9
      )
      RETURNING
        id,
        booking_reference,
        total_amount,
        status,
        travel_date,
        created_at
      `,
      [
        userId,
        scheduleId,
        boardingPointId,
        droppingPointId,
        whatsapp,
        email,
        finalAmount,
        bookingReference,
        travelDate,
      ],
    );

    const booking = bookingResult.rows[0];

    // --------------------------------------------------
    // 15. Create booking passengers
    // --------------------------------------------------

    for (const passenger of passengers) {
      await client.query(
        `
        INSERT INTO booking_passengers (
          booking_id,
          seat_id,
          name,
          age,
          gender
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5
        )
        `,
        [
          booking.id,
          passenger.seatId,
          passenger.name.trim(),
          Number(passenger.age),
          passenger.gender,
        ],
      );
    }

    // --------------------------------------------------
    // 16. Create payment record
    // --------------------------------------------------

    await client.query(
      `
      INSERT INTO payments (
        booking_id,
        amount,
        payment_method,
        status,
        transaction_reference
      )
      VALUES (
        $1,
        $2,
        $3,
        'SUCCESS',
        $4
      )
      `,
      [booking.id, finalAmount, paymentMethod, transactionReference],
    );

    // --------------------------------------------------
    // 17. COMMIT
    // --------------------------------------------------

    await client.query("COMMIT");

    // --------------------------------------------------
    // 18. Send successful response
    // --------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",

      booking: {
        id: booking.id,
        bookingReference: booking.booking_reference,
        travelDate: booking.travel_date,
        totalAmount: Number(booking.total_amount),
        status: booking.status,
        paymentMethod,
        transactionReference,
        seats: seatsResult.rows.map((seat) => ({
          id: seat.id,
          seatNumber: seat.seat_number,
          seatType: seat.seat_type,
          price: Number(seat.price),
        })),
      },
    });
  } catch (error) {
    // --------------------------------------------------
    // ROLLBACK
    // --------------------------------------------------

    await client.query("ROLLBACK");

    console.error("Booking transaction failed:", error);

    if (error.message.startsWith("Seats already booked:")) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message.includes("Invalid boarding point") ||
      error.message.includes("Invalid dropping point") ||
      error.message.includes("Schedule not found") ||
      error.message.includes("selected seats are invalid")
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Booking could not be completed",
    });
  } finally {
    // Always return the database connection
    // to the connection pool.
    client.release();
  }
};

module.exports = {
  createBooking,
};
