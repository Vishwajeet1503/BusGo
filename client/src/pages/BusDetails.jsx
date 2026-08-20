import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import { getBusDetails } from "../services/api";

const calculateArrivalDateTime = (
  travelDate,
  departureTime,
  durationMinutes,
) => {
  const departureDateTime = new Date(`${travelDate}T${departureTime}`);

  const arrivalDateTime = new Date(
    departureDateTime.getTime() + durationMinutes * 60 * 1000,
  );

  return arrivalDateTime;
};

const formatDateTime = (date) => {
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const calculatePointDateTime = (travelDate, pointTime, departureTime) => {
  const departureDateTime = new Date(`${travelDate}T${departureTime}`);

  let pointDateTime = new Date(`${travelDate}T${pointTime}`);

  // If the point time is earlier than departure time,
  // the point is on the following day.
  if (pointDateTime.getTime() < departureDateTime.getTime()) {
    pointDateTime.setDate(pointDateTime.getDate() + 1);
  }

  return pointDateTime;
};

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
     Calculate Arrival
  ========================================================= */

  const arrivalDateTime = bus
    ? calculateArrivalDateTime(
        date,
        bus.departure_time,
        Number(bus.duration_minutes),
      )
    : null;

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

    const selectedBoardingPoint = boardingPoints.find(
      (point) => String(point.id) === String(boardingPoint),
    );

    const selectedDroppingPoint = droppingPoints.find(
      (point) => String(point.id) === String(droppingPoint),
    );

    navigate("/passenger-details", {
      state: {
        scheduleId: id,
        travelDate: date,
        selectedSeats,
        boardingPointId: boardingPoint,
        droppingPointId: droppingPoint,
        boardingPoint: selectedBoardingPoint,
        droppingPoint: selectedDroppingPoint,
        bus,
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

          <div className="bus-time-info">
            <div className="time-point">
              <strong>
                {new Date(`${date}T${bus.departure_time}`).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  },
                )}
              </strong>

              <span>
                {new Date(`${date}T${bus.departure_time}`).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>

              <small>{bus.source}</small>
            </div>

            <div className="journey-duration">
              <span>
                {Math.floor(bus.duration_minutes / 60)}h{" "}
                {bus.duration_minutes % 60}m
              </span>

              <div className="duration-line">─────────────</div>
            </div>

            <div className="time-point">
              <strong>
                {arrivalDateTime &&
                  arrivalDateTime.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
              </strong>

              <span>
                {arrivalDateTime &&
                  arrivalDateTime.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
              </span>

              <small>{bus.destination}</small>
            </div>
          </div>

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

                  {boardingPoints.map((point) => {
                    const boardingDateTime = calculatePointDateTime(
                      date,
                      point.departure_time,
                      bus.departure_time,
                    );

                    return (
                      <option key={point.id} value={point.id}>
                        {point.name} -{" "}
                        {boardingDateTime.toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </option>
                    );
                  })}
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

                  {droppingPoints.map((point) => {
                    const droppingDateTime = calculatePointDateTime(
                      date,
                      point.arrival_time,
                      bus.departure_time,
                    );

                    return (
                      <option key={point.id} value={point.id}>
                        {point.name} -{" "}
                        {droppingDateTime.toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </option>
                    );
                  })}
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
