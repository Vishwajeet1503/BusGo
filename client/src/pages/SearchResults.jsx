import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import { searchBuses } from "../services/api";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await searchBuses(from, to, date);

        if (!result.success) {
          setError(result.message);
          return;
        }

        setBuses(result.buses);
      } catch (error) {
        setError("Unable to load buses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [from, to, date]);

  return (
    <div>
      <Header />

      <main className="results-page">
        <div className="results-container">
          <div className="results-header">
            <div>
              <h1>
                {from} → {to}
              </h1>

              <p>Journey date: {date}</p>
            </div>

            <button className="secondary-button" onClick={() => navigate("/")}>
              Modify Search
            </button>
          </div>

          {loading && (
            <div className="state-message">Searching for buses...</div>
          )}

          {error && <div className="error-message">{error}</div>}

          {!loading && !error && buses.length === 0 && (
            <div className="empty-state">
              <h2>No buses found</h2>
              <p>Try another date or route.</p>
            </div>
          )}

          <div className="bus-list">
            {buses.map((bus) => (
              <div className="bus-card" key={bus.schedule_id}>
                <div className="bus-main">
                  <div className="operator-section">
                    <h2>{bus.operator_name}</h2>

                    <p>{bus.bus_type}</p>

                    <span className="rating">★ {bus.operator_rating}</span>
                  </div>

                  <div className="time-section">
                    <div>
                      <strong>{bus.departure_time.slice(0, 5)}</strong>

                      <span>{bus.source}</span>
                    </div>

                    <div className="journey-line">─────────</div>

                    <div>
                      <strong>{bus.arrival_time.slice(0, 5)}</strong>

                      <span>{bus.destination}</span>
                    </div>
                  </div>

                  <div className="price-section">
                    <span className="price">₹{bus.base_price}</span>

                    <span>{bus.total_seats} seats</span>
                  </div>
                </div>

                <div className="bus-footer">
                  <span>{bus.bus_number}</span>

                  <button
                    className="primary-button"
                    onClick={() => navigate(`/bus/${bus.schedule_id}`)}
                  >
                    View Seats
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
