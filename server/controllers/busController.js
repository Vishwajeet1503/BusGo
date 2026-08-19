const pool = require("../db/database");

/*
  Validate and parse a travel date.

  Expected format:
  YYYY-MM-DD

  Example:
  2026-08-20
*/
const getTravelDate = (date) => {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return null;
  }

  const selectedDate = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(selectedDate.getTime())) {
    return null;
  }

  return selectedDate;
};

/*
  SEARCH BUSES
  GET /api/buses/search?from=Pune&to=Mumbai&date=2026-08-20
*/
const searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    // Validate required fields
    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: "From, to and date are required",
      });
    }

    // Validate travel date
    const selectedDate = getTravelDate(date);

    if (!selectedDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid travel date. Use YYYY-MM-DD format.",
      });
    }

    // PostgreSQL:
    // 0 = Sunday
    // 1 = Monday
    // 2 = Tuesday
    // 3 = Wednesday
    // 4 = Thursday
    // 5 = Friday
    // 6 = Saturday
    const dayOfWeek = selectedDate.getUTCDay();

    const result = await pool.query(
      `
      SELECT
        bs.id AS schedule_id,

        bo.id AS operator_id,
        bo.name AS operator_name,
        bo.rating AS operator_rating,

        b.id AS bus_id,
        b.bus_number,
        b.bus_type,
        b.total_seats,

        r.source,
        r.destination,

        bs.day_of_week,
        bs.departure_time,
        bs.arrival_time,
        bs.duration_minutes,
        bs.base_price

      FROM bus_schedules bs

      JOIN buses b
        ON bs.bus_id = b.id

      JOIN bus_operators bo
        ON b.operator_id = bo.id

      JOIN routes r
        ON bs.route_id = r.id

      WHERE LOWER(r.source) = LOWER($1)
        AND LOWER(r.destination) = LOWER($2)
        AND bs.day_of_week = $3

      ORDER BY bs.base_price ASC
      `,
      [from.trim(), to.trim(), dayOfWeek],
    );

    res.json({
      success: true,
      count: result.rows.length,

      travel_date: date,
      day_of_week: dayOfWeek,

      buses: result.rows,
    });
  } catch (error) {
    console.error("Search buses error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to search buses",
    });
  }
};

/*
  GET BUS DETAILS
  GET /api/buses/:id?date=2026-08-20
*/
const getBusDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    // Validate date
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Travel date is required",
      });
    }

    const selectedDate = getTravelDate(date);

    if (!selectedDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid travel date. Use YYYY-MM-DD format.",
      });
    }

    const dayOfWeek = selectedDate.getUTCDay();

    /*
      Get bus + schedule + route information
    */
    const busResult = await pool.query(
      `
      SELECT
        bs.id AS schedule_id,

        bo.id AS operator_id,
        bo.name AS operator_name,
        bo.rating AS operator_rating,

        b.id AS bus_id,
        b.bus_number,
        b.bus_type,
        b.total_seats,

        r.source,
        r.destination,

        bs.day_of_week,
        bs.departure_time,
        bs.arrival_time,
        bs.duration_minutes,
        bs.base_price

      FROM bus_schedules bs

      JOIN buses b
        ON bs.bus_id = b.id

      JOIN bus_operators bo
        ON b.operator_id = bo.id

      JOIN routes r
        ON bs.route_id = r.id

      WHERE bs.id = $1
      `,
      [id],
    );

    // Schedule doesn't exist
    if (busResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bus schedule not found",
      });
    }

    const bus = busResult.rows[0];

    /*
      Make sure this recurring schedule
      actually operates on the selected date.
    */
    if (Number(bus.day_of_week) !== dayOfWeek) {
      return res.status(400).json({
        success: false,
        message: "This bus does not operate on the selected date",
      });
    }

    /*
      Get all seats belonging to this bus
    */
    const seatsResult = await pool.query(
      `
      SELECT
        id,
        seat_number,
        seat_type,
        price

      FROM seats

      WHERE bus_id = $1

      ORDER BY id
      `,
      [bus.bus_id],
    );

    /*
      Get seats already booked for:

      specific schedule
      +
      specific travel date

      This is important because the same seat
      can be booked again on another date.
    */
    const bookedSeatsResult = await pool.query(
      `
      SELECT DISTINCT
        bp.seat_id

      FROM booking_passengers bp

      JOIN bookings bk
        ON bp.booking_id = bk.id

      WHERE bk.schedule_id = $1
        AND bk.travel_date = $2
        AND bk.status IN ('PENDING', 'CONFIRMED')
      `,
      [id, date],
    );

    const bookedSeatIds = bookedSeatsResult.rows.map((row) => row.seat_id);

    /*
      Add isBooked to every seat
    */
    const seats = seatsResult.rows.map((seat) => ({
      ...seat,
      isBooked: bookedSeatIds.includes(seat.id),
    }));

    /*
      Get boarding points
    */
    const boardingResult = await pool.query(
      `
      SELECT
        id,
        name,
        address,
        departure_time

      FROM boarding_points

      WHERE schedule_id = $1

      ORDER BY departure_time
      `,
      [id],
    );

    /*
      Get dropping points
    */
    const droppingResult = await pool.query(
      `
      SELECT
        id,
        name,
        address,
        arrival_time

      FROM dropping_points

      WHERE schedule_id = $1

      ORDER BY arrival_time
      `,
      [id],
    );

    /*
      Final response
    */
    res.json({
      success: true,

      travelDate: date,

      dayOfWeek: dayOfWeek,

      bus,

      seats,

      boardingPoints: boardingResult.rows,

      droppingPoints: droppingResult.rows,
    });
  } catch (error) {
    console.error("Bus details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get bus details",
    });
  }
};

module.exports = {
  searchBuses,
  getBusDetails,
};
