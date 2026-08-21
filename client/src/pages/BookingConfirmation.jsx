import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    booking,
    travelDate,
    selectedSeats,
    passengers,
    contactDetails,
    bus,
    boardingPoint,
    droppingPoint,
  } = location.state || {};

  // If the user directly opens this URL without
  // completing a booking, show an error message.
  if (!booking) {
    return (
      <main className="confirmation-page">
        <div className="confirmation-card">
          <h1>Booking Information Not Found</h1>

          <p>We could not find the booking information.</p>

          <button className="confirmation-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="confirmation-page">
      <div className="confirmation-container">
        {/* Success Header */}

        <section className="confirmation-success">
          <div className="success-icon">✓</div>

          <h1>Booking Confirmed!</h1>

          <p>Your bus ticket has been booked successfully.</p>

          <div className="booking-reference">
            Booking Reference:
            <strong>{booking.bookingReference}</strong>
          </div>
        </section>

        {/* Booking Details */}

        <section className="confirmation-card">
          <h2>Booking Details</h2>

          <div className="confirmation-grid">
            <div>
              <label>Status</label>
              <strong className="confirmed-status">{booking.status}</strong>
            </div>

            <div>
              <label>Travel Date</label>
              <strong>{booking.travelDate}</strong>
            </div>

            <div>
              <label>Payment Method</label>
              <strong>{booking.paymentMethod}</strong>
            </div>

            <div>
              <label>Total Paid</label>
              <strong>₹{booking.totalAmount}</strong>
            </div>
          </div>
        </section>

        {/* Journey Details */}

        <section className="confirmation-card">
          <h2>Journey Details</h2>

          <div className="journey-confirmation">
            <div>
              <label>From</label>

              <strong>{bus?.source || "Selected source"}</strong>

              {boardingPoint && <span>{boardingPoint.name}</span>}
            </div>

            <div className="confirmation-arrow">→</div>

            <div>
              <label>To</label>

              <strong>{bus?.destination || "Selected destination"}</strong>

              {droppingPoint && <span>{droppingPoint.name}</span>}
            </div>
          </div>
        </section>

        {/* Bus Details */}

        <section className="confirmation-card">
          <h2>Bus Details</h2>

          <div className="confirmation-grid">
            <div>
              <label>Operator</label>

              <strong>{bus?.operator_name || "Bus Operator"}</strong>
            </div>

            <div>
              <label>Bus Type</label>

              <strong>{bus?.bus_type || "Bus"}</strong>
            </div>

            <div>
              <label>Seats</label>

              <strong>{selectedSeats?.length || 0}</strong>
            </div>

            <div>
              <label>Seat Numbers</label>

              <strong>
                {selectedSeats?.map((seat) => seat.seat_number).join(", ") ||
                  "-"}
              </strong>
            </div>
          </div>
        </section>

        {/* Passenger Details */}

        <section className="confirmation-card">
          <h2>Passenger Details</h2>

          <div className="passenger-confirmation">
            {passengers?.map((passenger, index) => (
              <div
                className="passenger-confirmation-row"
                key={passenger.seatId || index}
              >
                <div>
                  <strong>{passenger.name}</strong>

                  <span>
                    {passenger.age} years · {passenger.gender}
                  </span>
                </div>

                <strong>Seat {passenger.seatNumber || passenger.seatId}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Details */}

        <section className="confirmation-card">
          <h2>Contact Details</h2>

          <div className="confirmation-grid">
            <div>
              <label>WhatsApp</label>

              <strong>+91 {contactDetails?.whatsapp}</strong>
            </div>

            <div>
              <label>Email</label>

              <strong>{contactDetails?.email}</strong>
            </div>
          </div>

          <p className="confirmation-note">
            Ticket details will be sent to the contact details provided during
            booking.
          </p>
        </section>

        {/* Transaction */}

        <section className="confirmation-card">
          <h2>Payment Details</h2>

          <div className="confirmation-grid">
            <div>
              <label>Payment Status</label>

              <strong className="confirmed-status">SUCCESS</strong>
            </div>

            <div>
              <label>Transaction Reference</label>

              <strong>{booking.transactionReference}</strong>
            </div>
          </div>
        </section>

        {/* Actions */}

        <div className="confirmation-actions">
          <button
            className="confirmation-button"
            onClick={() => navigate("/dashboard")}
          >
            View My Bookings
          </button>

          <button
            className="secondary-confirmation-button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default BookingConfirmation;
