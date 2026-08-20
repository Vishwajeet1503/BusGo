import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    scheduleId,
    travelDate,
    selectedSeats,
    boardingPointId,
    droppingPointId,
    passengers,
    totalAmount,
    bus,
    boardingPoint,
    droppingPoint,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  if (!location.state) {
    return <div className="state-message">Booking information not found.</div>;
  }

  /*
   * Fare calculation
   *
   * Base fare = selected seat prices
   * GST       = 5% of base fare
   * Discount  = demo discount
   */
  const baseFare = Number(totalAmount);

  const gst = Math.round(baseFare * 0.05);

  const discount = baseFare >= 2000 ? 100 : 0;

  const finalAmount = baseFare + gst - discount;

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handlePayment = async () => {
    setProcessing(true);

    /*
     * Payment API will be connected in the
     * next step.
     *
     * For now this is only UI behavior.
     */

    setTimeout(() => {
      setProcessing(false);

      navigate("/booking-confirmation", {
        state: {
          scheduleId,
          travelDate,
          selectedSeats,
          boardingPointId,
          droppingPointId,
          passengers,
          paymentMethod,
          baseFare,
          gst,
          discount,
          finalAmount,
        },
      });
    }, 1500);
  };

  return (
    <main className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Checkout</h1>

          <p>Review your booking and complete payment.</p>
        </div>

        <div className="checkout-grid">
          {/* LEFT SIDE */}

          <div className="checkout-main">
            {/* Journey Details */}

            <section className="checkout-card">
              <h2>Journey Details</h2>

              <div className="journey-route">
                <div>
                  <strong>{bus?.source}</strong>

                  <span>{travelDate}</span>
                </div>

                <div className="journey-arrow">→</div>

                <div>
                  <strong>{bus?.destination}</strong>

                  <span>
                    {bus?.duration_minutes
                      ? `${Math.floor(bus.duration_minutes / 60)}h ${
                          bus.duration_minutes % 60
                        }m`
                      : ""}
                  </span>
                </div>
              </div>

              <div className="journey-points">
                <div>
                  <label>Boarding Point</label>

                  <strong>
                    {boardingPoint?.name || "Selected boarding point"}
                  </strong>

                  <span>{boardingPoint?.address}</span>
                </div>

                <div>
                  <label>Dropping Point</label>

                  <strong>
                    {droppingPoint?.name || "Selected dropping point"}
                  </strong>

                  <span>{droppingPoint?.address}</span>
                </div>
              </div>
            </section>

            {/* Bus Details */}

            <section className="checkout-card">
              <h2>Bus Details</h2>

              <div className="bus-summary-grid">
                <div>
                  <label>Operator</label>
                  <strong>{bus?.operator_name}</strong>
                </div>

                <div>
                  <label>Bus Type</label>
                  <strong>{bus?.bus_type}</strong>
                </div>

                <div>
                  <label>Seats</label>
                  <strong>{selectedSeats?.length}</strong>
                </div>

                <div>
                  <label>Seat Numbers</label>
                  <strong>
                    {selectedSeats?.map((seat) => seat.seat_number).join(", ")}
                  </strong>
                </div>
              </div>
            </section>

            {/* Passenger Details */}

            <section className="checkout-card">
              <h2>Passenger Details</h2>

              <div className="passenger-summary">
                {passengers?.map((passenger, index) => (
                  <div className="passenger-summary-row" key={passenger.seatId}>
                    <div>
                      <strong>{passenger.name}</strong>

                      <span>
                        {passenger.age} years · {passenger.gender}
                      </span>
                    </div>

                    <strong>Seat {passenger.seatNumber}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}

          <aside className="checkout-sidebar">
            {/* Fare Breakdown */}

            <section className="checkout-card">
              <h2>Fare Breakdown</h2>

              <div className="fare-row">
                <span>Base Fare</span>
                <strong>₹{baseFare}</strong>
              </div>

              <div className="fare-row">
                <span>GST (5%)</span>
                <strong>₹{gst}</strong>
              </div>

              <div className="fare-row discount">
                <span>Discount</span>
                <strong>- ₹{discount}</strong>
              </div>

              <div className="fare-total">
                <span>Total Amount</span>

                <strong>₹{finalAmount}</strong>
              </div>
            </section>

            {/* Payment Method */}

            <section className="checkout-card">
              <h2>Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />

                <span>UPI</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />

                <span>Credit / Debit Card</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="NET_BANKING"
                  checked={paymentMethod === "NET_BANKING"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />

                <span>Net Banking</span>
              </label>
            </section>

            {/* Payment Button */}

            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? "Processing Payment..." : `Pay ₹${finalAmount}`}
            </button>

            <p className="demo-payment-note">
              Demo payment system. No real money will be charged.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Payment;
