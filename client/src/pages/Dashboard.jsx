import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load bookings");
      }

      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Dashboard booking error:", error);

      setError(error.message || "Unable to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookings.filter((booking) => {
    const travelDate = new Date(booking.travel_date);

    return travelDate >= today && booking.status !== "CANCELLED";
  });

  const previousBookings = bookings.filter((booking) => {
    const travelDate = new Date(booking.travel_date);

    return travelDate < today || booking.status === "CANCELLED";
  });

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

  const renderBookingCard = (booking) => (
    <div className="dashboard-booking-card" key={booking.id}>
      <div className="booking-card-top">
        <div>
          <h3>
            {booking.source}
            {" → "}
            {booking.destination}
          </h3>

          <p>
            Booking ID: <strong>{booking.booking_reference}</strong>
          </p>
        </div>

        <span
          className={`booking-status ${
            booking.status === "CONFIRMED"
              ? "status-confirmed"
              : "status-cancelled"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <div className="booking-card-details">
        <div>
          <span>Date</span>
          <strong>{formatDate(booking.travel_date)}</strong>
        </div>

        <div>
          <span>Departure</span>
          <strong>{formatTime(booking.departure_time)}</strong>
        </div>

        <div>
          <span>Arrival</span>
          <strong>{formatTime(booking.arrival_time)}</strong>
        </div>

        <div>
          <span>Seats</span>
          <strong>{booking.seat_numbers || "-"}</strong>
        </div>

        <div>
          <span>Total</span>
          <strong>
            ₹{Number(booking.total_amount).toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="booking-card-bottom">
        <div>
          <strong>{booking.bus_type}</strong>

          <span>
            {booking.boarding_point}
            {" → "}
            {booking.dropping_point}
          </span>
        </div>

        <button
          className="view-booking-button"
          onClick={() => navigate(`/booking/${booking.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-container">
          <h1>My Bookings</h1>

          <div className="dashboard-message">Loading your bookings...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-container">
          <h1>My Bookings</h1>

          <div className="dashboard-error">
            <p>{error}</p>

            <button onClick={fetchBookings}>Try Again</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>My Bookings</h1>

            <p>Manage your bus bookings and travel information.</p>
          </div>

          <button
            className="dashboard-home-button"
            onClick={() => navigate("/")}
          >
            Search Buses
          </button>
        </div>

        {/* Upcoming */}

        <section className="booking-section">
          <h2>Upcoming Bookings</h2>

          {upcomingBookings.length === 0 ? (
            <div className="dashboard-empty">
              <h3>No upcoming bookings</h3>

              <p>You don't have any upcoming trips.</p>

              <button onClick={() => navigate("/")}>Search Buses</button>
            </div>
          ) : (
            <div className="booking-list">
              {upcomingBookings.map(renderBookingCard)}
            </div>
          )}
        </section>

        {/* Previous */}

        <section className="booking-section">
          <h2>Previous Bookings</h2>

          {previousBookings.length === 0 ? (
            <div className="dashboard-empty">
              <h3>No previous bookings</h3>

              <p>Your completed or cancelled trips will appear here.</p>
            </div>
          ) : (
            <div className="booking-list">
              {previousBookings.map(renderBookingCard)}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
