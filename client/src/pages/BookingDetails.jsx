import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../config";
import Header from "../components/Header";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load booking details");
      }

      setBooking(data.booking);
    } catch (error) {
      console.error("Booking details error:", error);

      setError(error.message || "Unable to load booking details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "-";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancelBooking = async () => {
    try {
      setCancelling(true);
      setCancelError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      // Update booking status immediately
      setBooking((previousBooking) => ({
        ...previousBooking,
        status: "CANCELLED",
        payment: previousBooking.payment
          ? {
              ...previousBooking.payment,
              status: "REFUNDED",
            }
          : null,
      }));

      setShowCancelModal(false);
    } catch (error) {
      console.error("Cancellation error:", error);

      setCancelError(error.message || "Unable to cancel booking");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="booking-details-page">
          <div className="booking-details-container">
            <div className="booking-details-message">
              Loading booking details...
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !booking) {
    return (
      <>
        <Header />
        <main className="booking-details-page">
          <div className="booking-details-container">
            <div className="booking-details-error">
              <h2>Unable to Load Booking</h2>

              <p>{error || "Booking information could not be found."}</p>

              <button onClick={() => navigate("/dashboard")}>
                Back to My Bookings
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="booking-details-page">
        <div className="booking-details-container">
          {/* Header */}

          <div className="booking-details-header">
            <button
              className="back-bookings-button"
              onClick={() => navigate("/dashboard")}
            >
              ← My Bookings
            </button>

            <div className="booking-title">
              <div>
                <h1>Booking Details</h1>

                <p>
                  Booking Reference:{" "}
                  <strong>{booking.booking_reference}</strong>
                </p>
              </div>

              <span
                className={`booking-detail-status ${
                  booking.status === "CONFIRMED"
                    ? "detail-status-confirmed"
                    : "detail-status-cancelled"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>

          {/* Journey */}

          <section className="booking-details-card">
            <h2>Journey Details</h2>

            <div className="journey-details">
              <div className="journey-location">
                <span>Departure</span>

                <strong>{booking.source}</strong>

                <p>{booking.boarding_point}</p>

                <small>{booking.boarding_address}</small>

                <strong>{formatTime(booking.departure_time)}</strong>
              </div>

              <div className="journey-line">
                →<span>{booking.duration_minutes} min</span>
              </div>

              <div className="journey-location">
                <span>Arrival</span>

                <strong>{booking.destination}</strong>

                <p>{booking.dropping_point}</p>

                <small>{booking.dropping_address}</small>

                <strong>{formatTime(booking.arrival_time)}</strong>
              </div>
            </div>

            <div className="journey-date">
              Travel Date:
              <strong>{formatDate(booking.travel_date)}</strong>
            </div>
          </section>

          {/* Bus */}

          <section className="booking-details-card">
            <h2>Bus Details</h2>

            <div className="booking-info-grid">
              <div>
                <span>Bus Type</span>
                <strong>{booking.bus_type}</strong>
              </div>

              <div>
                <span>Bus ID</span>
                <strong>{booking.bus_id}</strong>
              </div>

              <div>
                <span>Seats</span>
                <strong>{booking.passengers?.length || 0}</strong>
              </div>

              <div>
                <span>Seat Numbers</span>
                <strong>
                  {booking.passengers
                    ?.map((passenger) => passenger.seat_number)
                    .join(", ") || "-"}
                </strong>
              </div>
            </div>
          </section>

          {/* Passengers */}

          <section className="booking-details-card">
            <h2>Passenger Details</h2>

            <div className="passenger-list">
              {booking.passengers?.map((passenger) => (
                <div className="passenger-row" key={passenger.id}>
                  <div>
                    <strong>{passenger.name}</strong>

                    <span>Age: {passenger.age}</span>

                    <span>Gender: {passenger.gender}</span>
                  </div>

                  <div className="passenger-seat">
                    <span>Seat</span>

                    <strong>{passenger.seat_number}</strong>

                    <small>{passenger.seat_type}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}

          <section className="booking-details-card">
            <h2>Contact Details</h2>

            <div className="booking-info-grid">
              <div>
                <span>WhatsApp</span>

                <strong>+91 {booking.whatsapp_number}</strong>
              </div>

              <div>
                <span>Email</span>

                <strong>{booking.contact_email}</strong>
              </div>
            </div>
          </section>

          {/* Payment */}

          <section className="booking-details-card">
            <h2>Payment Details</h2>

            {booking.payment ? (
              <div className="booking-info-grid">
                <div>
                  <span>Payment Method</span>

                  <strong>{booking.payment.payment_method}</strong>
                </div>

                <div>
                  <span>Payment Status</span>

                  <strong className="payment-success">
                    {booking.payment.status}
                  </strong>
                </div>

                <div>
                  <span>Transaction Reference</span>

                  <strong>{booking.payment.transaction_reference}</strong>
                </div>

                <div>
                  <span>Amount Paid</span>

                  <strong>
                    ₹{Number(booking.payment.amount).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            ) : (
              <p>Payment information unavailable.</p>
            )}
          </section>

          {/* Fare */}

          <section className="booking-details-card">
            <h2>Fare Summary</h2>

            <div className="fare-summary">
              <div>
                <span>Total Amount</span>

                <strong>
                  ₹{Number(booking.total_amount).toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          </section>

          {/* Actions */}

          <div className="booking-detail-actions">
            {booking.status === "CONFIRMED" && (
              <button
                className="cancel-booking-button"
                onClick={() => {
                  setCancelError("");
                  setShowCancelModal(true);
                }}
              >
                Cancel Booking
              </button>
            )}

            <button
              className="back-dashboard-button"
              onClick={() => navigate("/dashboard")}
            >
              Back to My Bookings
            </button>
          </div>
        </div>
        {showCancelModal && (
          <div className="cancel-modal-overlay">
            <div className="cancel-modal">
              <button
                className="cancel-modal-close"
                onClick={() => setShowCancelModal(false)}
                disabled={cancelling}
              >
                ×
              </button>

              <h2>Cancel Booking?</h2>

              <p>Are you sure you want to cancel this booking?</p>

              <div className="cancel-warning">
                <strong>Booking Reference</strong>

                <span>{booking.booking_reference}</span>

                <strong>Refund Amount</strong>

                <span>
                  ₹{Number(booking.total_amount).toLocaleString("en-IN")}
                </span>
              </div>

              <p className="refund-note">
                This is a simulated payment system. The payment will be marked
                as REFUNDED.
              </p>

              {cancelError && <div className="cancel-error">{cancelError}</div>}

              <div className="cancel-modal-actions">
                <button
                  className="keep-booking-button"
                  onClick={() => setShowCancelModal(false)}
                  disabled={cancelling}
                >
                  Keep Booking
                </button>

                <button
                  className="confirm-cancel-button"
                  onClick={handleCancelBooking}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default BookingDetails;
