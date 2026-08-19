import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import { getBusDetails } from "../services/api";

/* =========================================================
   SLEEPER SEAT COMPONENT
========================================================= */

const SleeperSeat = ({ seat, selected, onClick }) => {
  return (
    <button
      type="button"
      disabled={seat.isBooked}
      className={`
        sleeper-seat
        ${seat.isBooked ? "booked" : ""}
        ${selected ? "selected" : ""}
      `}
      onClick={() => onClick(seat)}
      title={seat.isBooked ? "Seat already booked" : `₹${seat.price}`}
    >
      <span className="sleeper-seat-label">{seat.seat_number}</span>
    </button>
  );
};

/* =========================================================
   BUS DETAILS
========================================================= */

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

  /* =========================================================
     FETCH BUS DETAILS
  ========================================================= */

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getBusDetails(id, date);

        if (!result.success) {
          setError(result.message);
          return;
        }

        setBus(result.bus);
        setSeats(result.seats || []);
        setBoardingPoints(result.boardingPoints || []);
        setDroppingPoints(result.droppingPoints || []);
      } catch (error) {
        console.error(error);
        setError("Unable to load bus details");
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [id, date]);

  /* =========================================================
     BUS TYPE
  ========================================================= */

  const isSleeper = bus?.bus_type?.toLowerCase().includes("sleeper");

  /* =========================================================
     SLEEPER DECKS
  ========================================================= */

  const lowerSeats = seats.filter((seat) => seat.seat_type === "LOWER");

  const upperSeats = seats.filter((seat) => seat.seat_type === "UPPER");

  /* =========================================================
     SEAT SELECTION
  ========================================================= */

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

  /* =========================================================
     TOTAL PRICE
  ========================================================= */

  const totalAmount = selectedSeats.reduce(
    (total, seat) => total + Number(seat.price),
    0,
  );

  /* =========================================================
     CONTINUE
  ========================================================= */

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

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <>
        <Header />

        <div className="state-message">Loading bus details...</div>
      </>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <>
        <Header />

        <div className="error-message">{error}</div>
      </>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div>
      <Header />

      <main className="bus-details-page">
        <div className="bus-details-container">
          {/* =================================================
              BUS INFORMATION
          ================================================= */}

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

          {/* =================================================
              BOOKING LAYOUT
          ================================================= */}

          <div className="booking-layout">
            {/* =================================================
                SEAT SELECTION
            ================================================= */}

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

              {/* =================================================
                  BUS LAYOUT
              ================================================= */}

              <div className="bus-layout">
                <div className="driver">DRIVER</div>

                {/* =================================================
                    SLEEPER BUS
                ================================================= */}

                {isSleeper ? (
                  <div className="sleeper-decks">
                    {/* ==============================
                        LOWER DECK
                    ============================== */}

                    <div className="sleeper-deck">
                      <h3>Lower Deck</h3>

                      <div className="sleeper-layout">
                        {/* LEFT SIDE
                            L01
                            L04
                            L07
                            L10
                            L13
                            L16
                        */}

                        <div className="sleeper-left">
                          {lowerSeats
                            .filter((_, index) => index % 3 === 0)
                            .map((seat) => (
                              <SleeperSeat
                                key={seat.id}
                                seat={seat}
                                selected={selectedSeats.some(
                                  (selected) => selected.id === seat.id,
                                )}
                                onClick={toggleSeat}
                              />
                            ))}
                        </div>

                        {/* RIGHT SIDE
                            L02 L03
                            L05 L06
                            L08 L09
                            L11 L12
                            L14 L15
                            L17 L18
                        */}

                        <div className="sleeper-right">
                          {lowerSeats
                            .filter((_, index) => index % 3 !== 0)
                            .map((seat) => (
                              <SleeperSeat
                                key={seat.id}
                                seat={seat}
                                selected={selectedSeats.some(
                                  (selected) => selected.id === seat.id,
                                )}
                                onClick={toggleSeat}
                              />
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* ==============================
                        UPPER DECK
                    ============================== */}

                    <div className="sleeper-deck">
                      <h3>Upper Deck</h3>

                      <div className="sleeper-layout">
                        {/* LEFT SIDE
                            U01
                            U04
                            U07
                            U10
                            U13
                            U16
                        */}

                        <div className="sleeper-left">
                          {upperSeats
                            .filter((_, index) => index % 3 === 0)
                            .map((seat) => (
                              <SleeperSeat
                                key={seat.id}
                                seat={seat}
                                selected={selectedSeats.some(
                                  (selected) => selected.id === seat.id,
                                )}
                                onClick={toggleSeat}
                              />
                            ))}
                        </div>

                        {/* RIGHT SIDE
                            U02 U03
                            U05 U06
                            U08 U09
                            U11 U12
                            U14 U15
                            U17 U18
                        */}

                        <div className="sleeper-right">
                          {upperSeats
                            .filter((_, index) => index % 3 !== 0)
                            .map((seat) => (
                              <SleeperSeat
                                key={seat.id}
                                seat={seat}
                                selected={selectedSeats.some(
                                  (selected) => selected.id === seat.id,
                                )}
                                onClick={toggleSeat}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* =================================================
                     SEATER BUS
                  ================================================= */

                  <div className="seater-layout">
                    {seats.map((seat) => {
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
                )}
              </div>
            </section>

            {/* =================================================
                BOOKING SUMMARY
            ================================================= */}

            <aside className="booking-summary">
              <h2>Trip Details</h2>

              {/* Route */}

              <div className="route-summary">
                <strong>{bus.source}</strong>

                <span>→</span>

                <strong>{bus.destination}</strong>
              </div>

              {/* Boarding Point */}

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

              {/* Dropping Point */}

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

              {/* Selected Seats */}

              <div className="selected-seat-summary">
                <span>Selected Seats</span>

                <strong>
                  {selectedSeats.length > 0
                    ? selectedSeats.map((seat) => seat.seat_number).join(", ")
                    : "None"}
                </strong>
              </div>

              {/* Total */}

              <div className="total-price">
                <span>Total</span>

                <strong>₹{totalAmount}</strong>
              </div>

              {/* Continue */}

              <button
                className="
                  primary-button
                  continue-button
                "
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
