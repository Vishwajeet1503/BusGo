import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    scheduleId,
    travelDate,
    selectedSeats,
    boardingPointId,
    droppingPointId,
    boardingPoint,
    droppingPoint,
    bus,
    totalAmount,
  } = location.state || {};

  const [passengers, setPassengers] = useState(
    selectedSeats?.map((seat) => ({
      seatId: seat.id,
      seatNumber: seat.seat_number,
      name: "",
      age: "",
      gender: "",
    })) || [],
  );

  const [error, setError] = useState("");

  const [contactDetails, setContactDetails] = useState({
    whatsapp: "",
    email: "",
  });

  if (!selectedSeats || selectedSeats.length === 0) {
    return <div className="state-message">No seats selected.</div>;
  }

  const handleChange = (index, field, value) => {
    setPassengers((current) =>
      current.map((passenger, i) =>
        i === index
          ? {
              ...passenger,
              [field]: value,
            }
          : passenger,
      ),
    );
  };

  const handleContactChange = (field, value) => {
    setContactDetails((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleContinue = (event) => {
    event.preventDefault();

    setError("");

    const whatsappRegex = /^[6-9]\d{9}$/;

    if (!whatsappRegex.test(contactDetails.whatsapp)) {
      setError("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    if (!contactDetails.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    for (const passenger of passengers) {
      if (!passenger.name.trim() || !passenger.age || !passenger.gender) {
        setError("Please complete details for every passenger.");
        return;
      }

      if (Number(passenger.age) < 1 || Number(passenger.age) > 120) {
        setError("Passenger age must be between 1 and 120.");
        return;
      }
    }

    navigate("/payment", {
      state: {
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
        totalAmount,
      },
    });
  };

  return (
    <>
      <Header />
      <main className="passenger-page">
        <div className="passenger-container">
          <h1>Passenger Details</h1>

          <p className="page-subtitle">Enter details for each selected seat.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleContinue}>
            <section className="passenger-card">
              <div className="passenger-card-header">
                <h2>Contact Details</h2>
              </div>

              <p className="contact-info-text">
                Your ticket details will be sent to the WhatsApp number and
                email provided below.
              </p>

              <div className="contact-form-grid">
                <div className="form-group">
                  <label>WhatsApp Number</label>

                  <div className="phone-input">
                    <span>+91</span>

                    <input
                      type="tel"
                      maxLength="10"
                      placeholder="Enter 10-digit mobile number"
                      value={contactDetails.whatsapp}
                      onChange={(event) =>
                        handleContactChange(
                          "whatsapp",
                          event.target.value.replace(/\D/g, ""),
                        )
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={contactDetails.email}
                    onChange={(event) =>
                      handleContactChange("email", event.target.value)
                    }
                  />
                </div>
              </div>
            </section>
            {passengers.map((passenger, index) => (
              <section className="passenger-card" key={passenger.seatId}>
                <div className="passenger-card-header">
                  <h2>Passenger {index + 1}</h2>

                  <span>Seat {passenger.seatNumber}</span>
                </div>

                <div className="passenger-form-grid">
                  <div className="form-group">
                    <label>Full Name</label>

                    <input
                      type="text"
                      value={passenger.name}
                      placeholder="Enter full name"
                      onChange={(event) =>
                        handleChange(index, "name", event.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Age</label>

                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={passenger.age}
                      placeholder="Age"
                      onChange={(event) =>
                        handleChange(index, "age", event.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Gender</label>

                    <select
                      value={passenger.gender}
                      onChange={(event) =>
                        handleChange(index, "gender", event.target.value)
                      }
                    >
                      <option value="">Select gender</option>

                      <option value="MALE">Male</option>

                      <option value="FEMALE">Female</option>

                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
              </section>
            ))}

            <div className="passenger-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

              <button type="submit" className="primary-button">
                Continue
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default PassengerDetails;
