import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* Bank List */
const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Bank of Baroda",
  "Punjab National Bank",
  "Canara Bank",
];

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
    contactDetails,
    totalAmount,
    bus,
    boardingPoint,
    droppingPoint,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [selectedBank, setSelectedBank] = useState("");

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setShowPaymentModal(true);
  };

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
    try {
      setProcessing(true);

      // Get the JWT token stored after login
      const token = localStorage.getItem("token");

      if (!token) {
        setProcessing(false);

        alert("Please login again to continue with the booking.");

        navigate("/login");
        return;
      }

      // Prepare passenger data for the backend
      const bookingPassengers = passengers.map((passenger) => ({
        seatId: Number(passenger.seatId),
        name: passenger.name.trim(),
        age: Number(passenger.age),
        gender: passenger.gender.toUpperCase(),
      }));

      // Send booking request to backend
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          scheduleId: Number(scheduleId),
          travelDate,

          boardingPointId: Number(boardingPointId),

          droppingPointId: Number(droppingPointId),

          passengers: bookingPassengers,

          paymentMethod,

          contactDetails: {
            whatsapp: contactDetails.whatsapp,

            email: contactDetails.email,
          },
        }),
      });

      const data = await response.json();

      // Handle API error
      if (!response.ok) {
        throw new Error(data.message || "Booking could not be completed.");
      }

      // Booking successfully created
      setProcessing(false);

      navigate("/booking-confirmation", {
        state: {
          booking: data.booking,
          scheduleId,
          travelDate,
          selectedSeats,
          boardingPointId,
          droppingPointId,
          boardingPoint,
          droppingPoint,
          bus,
          passengers,
          contactDetails,
          paymentMethod,
          baseFare,
          gst,
          discount,
          finalAmount,
        },
      });
    } catch (error) {
      console.error("Booking failed:", error);

      setProcessing(false);

      alert(
        error.message || "Something went wrong while creating your booking.",
      );
    }
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

            {/* Contact Details */}

            <section className="checkout-card">
              <h2>Contact Details</h2>

              <div className="contact-summary">
                <div>
                  <label>WhatsApp</label>
                  <strong>+91 {contactDetails?.whatsapp}</strong>
                </div>

                <div>
                  <label>Email</label>
                  <strong>{contactDetails?.email}</strong>
                </div>
              </div>

              <p className="demo-payment-note">
                Your ticket confirmation will be sent to the contact details
                provided above.
              </p>
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
                  onChange={() => handlePaymentMethod("UPI")}
                />

                <span>UPI</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={() => handlePaymentMethod("CARD")}
                />

                <span>Credit / Debit Card</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="NET_BANKING"
                  checked={paymentMethod === "NET_BANKING"}
                  onChange={() => handlePaymentMethod("NET_BANKING")}
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

      {showPaymentModal && paymentMethod === "UPI" && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <button
              className="modal-close"
              onClick={() => setShowPaymentModal(false)}
            >
              ×
            </button>

            <h2>Pay with UPI</h2>

            <p>Scan the QR code using your UPI app.</p>

            <div className="upi-qr">
              <div className="qr-placeholder">DEMO QR</div>
            </div>

            <p className="demo-payment-note">
              This is a simulated payment. No real transaction will occur.
            </p>

            <button
              className="primary-button"
              onClick={() => setShowPaymentModal(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showPaymentModal && paymentMethod === "CARD" && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <button
              className="modal-close"
              onClick={() => setShowPaymentModal(false)}
            >
              ×
            </button>

            <h2>Card Details</h2>

            <div className="modal-form">
              <label>Cardholder Name</label>

              <input
                type="text"
                placeholder="Name on card"
                value={cardDetails.name}
                onChange={(event) =>
                  setCardDetails({
                    ...cardDetails,
                    name: event.target.value,
                  })
                }
              />

              <label>Card Number</label>

              <input
                type="text"
                maxLength="16"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(event) =>
                  setCardDetails({
                    ...cardDetails,
                    number: event.target.value.replace(/\D/g, ""),
                  })
                }
              />

              <div className="card-input-row">
                <div>
                  <label>Expiry</label>

                  <input
                    type="text"
                    maxLength="5"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(event) =>
                      setCardDetails({
                        ...cardDetails,
                        expiry: event.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>CVV</label>

                  <input
                    type="password"
                    maxLength="3"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(event) =>
                      setCardDetails({
                        ...cardDetails,
                        cvv: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowPaymentModal(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showPaymentModal && paymentMethod === "NET_BANKING" && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <button
              className="modal-close"
              onClick={() => setShowPaymentModal(false)}
            >
              ×
            </button>

            <h2>Select Your Bank</h2>

            <div className="bank-list">
              {banks.map((bank) => (
                <label className="bank-option" key={bank}>
                  <input
                    type="radio"
                    name="bank"
                    value={bank}
                    checked={selectedBank === bank}
                    onChange={(event) => setSelectedBank(event.target.value)}
                  />

                  <span>{bank}</span>
                </label>
              ))}
            </div>

            <button
              className="primary-button"
              disabled={!selectedBank}
              onClick={() => setShowPaymentModal(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Payment;
