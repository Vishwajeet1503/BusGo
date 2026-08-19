import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import { getBusDetails } from "../services/api";

const BusDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const date = searchParams.get("date");

  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [boardingPoints, setBoardingPoints] = useState([]);
  const [droppingPoints, setDroppingPoints] = useState([]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boardingPoint, setBoardingPoint] = useState("");
  const [droppingPoint, setDroppingPoint] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        setLoading(true);

        const result = await getBusDetails(id, date);

        if (!result.success) {
          setError(result.message);
          return;
        }

        setBus(result.bus);
        setSeats(result.seats);
        setBoardingPoints(result.boardingPoints);
        setDroppingPoints(result.droppingPoints);
      } catch (error) {
        setError("Unable to load bus details");
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [id, date]);

  const toggleSeat = (seat) => {
    if (seat.isBooked) {
      return;
    }

    setSelectedSeats((current) => {
      const alreadySelected = current.some(
        (selected) => selected.id === seat.id,
      );

      if (alreadySelected) {
        return current.filter((selected) => selected.id !== seat.id);
      }

      return [...current, seat];
    });
  };

  const totalAmount = selectedSeats.reduce(
    (total, seat) => total + Number(seat.price),
    0,
  );

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      return;
    }

    if (!boardingPoint || !droppingPoint) {
      return;
    }

    navigate("/passenger-details", {
      state: {
        scheduleId: id,
        travelDate: date,
        selectedSeats,
        boardingPointId: boardingPoint,
        droppingPointId: droppingPoint,
        totalAmount,
      },
    });
  };

  if (loading) {
    return (
      <>
        <Header />

        <div className="state-message">Loading bus details...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />

        <div className="error-message">{error}</div>
      </>
    );
  }

  return (
    <div>
      <Header />

      <main className="bus-details-page">
        <div className="bus-details-container">
          {/* Bus information */}

          <section className="bus-info-card">
            <div>
              <h1>{bus.operator_name}</h1>

              <p>
                {bus.bus_type} · {bus.bus_number}
              </p>

              <p>
                {bus.source} → {bus.destination}
              </p>
            </div>

            <div className="bus-time-info">
              <strong>{bus.departure_time.slice(0, 5)}</strong>

              <span>→</span>

              <strong>{bus.arrival_time.slice(0, 5)}</strong>

              <small>{date}</small>
            </div>
          </section>

          <div className="booking-layout">
            {/* Seat Selection */}

            <section className="seat-section">
              <div className="section-heading">
                <h2>Select Seats</h2>

                <div className="seat-legend">
                  <span>
                    <i className="legend available"></i>
                    Available
                  </span>

                  <span>
                    <i className="legend selected"></i>
                    Selected
                  </span>

                  <span>
                    <i className="legend booked"></i>
                    Booked
                  </span>
                </div>
              </div>

              <div className="bus-layout">
                <div className="driver">DRIVER</div>

                <div className="seat-grid">
                  {seats.map((seat, index) => {
                    const isSelected = selectedSeats.some(
                      (selected) => selected.id === seat.id,
                    );

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={seat.isBooked}
                        className={`
                          seat
                          ${seat.isBooked ? "booked" : ""}
                          ${isSelected ? "selected" : ""}
                        `}
                        onClick={() => toggleSeat(seat)}
                        title={
                          seat.isBooked
                            ? "Seat already booked"
                            : `₹${seat.price}`
                        }
                      >
                        {seat.seat_number}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Booking Summary */}

            <aside className="booking-summary">
              <h2>Trip Details</h2>

              <div className="route-summary">
                <strong>{bus.source}</strong>
                <span>→</span>
                <strong>{bus.destination}</strong>
              </div>

              <div className="summary-group">
                <label>Boarding Point</label>

                <select
                  value={boardingPoint}
                  onChange={(event) => setBoardingPoint(event.target.value)}
                >
                  <option value="">Select boarding point</option>

                  {boardingPoints.map((point) => (
                    <option key={point.id} value={point.id}>
                      {point.name} - {point.departure_time.slice(0, 5)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="summary-group">
                <label>Dropping Point</label>

                <select
                  value={droppingPoint}
                  onChange={(event) => setDroppingPoint(event.target.value)}
                >
                  <option value="">Select dropping point</option>

                  {droppingPoints.map((point) => (
                    <option key={point.id} value={point.id}>
                      {point.name} - {point.arrival_time.slice(0, 5)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="selected-seat-summary">
                <span>Selected Seats</span>

                <strong>
                  {selectedSeats.length > 0
                    ? selectedSeats.map((seat) => seat.seat_number).join(", ")
                    : "None"}
                </strong>
              </div>

              <div className="total-price">
                <span>Total</span>

                <strong>₹{totalAmount}</strong>
              </div>

              <button
                className="primary-button continue-button"
                disabled={
                  selectedSeats.length === 0 || !boardingPoint || !droppingPoint
                }
                onClick={handleContinue}
              >
                Continue
              </button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusDetails;
