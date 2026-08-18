import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

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

  const [busType, setBusType] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("price");

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

  const filteredAndSortedBuses = useMemo(() => {
    let result = [...buses];

    if (busType !== "ALL") {
      result = result.filter((bus) =>
        bus.bus_type.toLowerCase().includes(busType.toLowerCase()),
      );
    }

    result = result.filter((bus) => Number(bus.base_price) <= maxPrice);

    result.sort((a, b) => {
      if (sortBy === "price") {
        return Number(a.base_price) - Number(b.base_price);
      }

      if (sortBy === "rating") {
        return Number(b.operator_rating) - Number(a.operator_rating);
      }

      if (sortBy === "departure") {
        return a.departure_time.localeCompare(b.departure_time);
      }

      return 0;
    });

    return result;
  }, [buses, busType, maxPrice, sortBy]);

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

          {!loading && !error && (
            <div className="results-layout">
              {/* Filters */}

              <aside className="filters">
                <div className="filter-header">
                  <h3>Filters</h3>

                  <button
                    onClick={() => {
                      setBusType("ALL");
                      setMaxPrice(2000);
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="filter-group">
                  <h4>Bus Type</h4>

                  <label>
                    <input
                      type="radio"
                      name="busType"
                      checked={busType === "ALL"}
                      onChange={() => setBusType("ALL")}
                    />
                    All
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="busType"
                      checked={busType === "AC"}
                      onChange={() => setBusType("AC")}
                    />
                    AC
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="busType"
                      checked={busType === "SLEEPER"}
                      onChange={() => setBusType("SLEEPER")}
                    />
                    Sleeper
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="busType"
                      checked={busType === "SEATER"}
                      onChange={() => setBusType("SEATER")}
                    />
                    Seater
                  </label>
                </div>

                <div className="filter-group">
                  <h4>Maximum Price</h4>

                  <input
                    type="range"
                    min="300"
                    max="2000"
                    step="50"
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(Number(event.target.value))
                    }
                  />

                  <p>Up to ₹{maxPrice}</p>
                </div>
              </aside>

              {/* Results */}

              <section className="results-section">
                <div className="sort-bar">
                  <span>{filteredAndSortedBuses.length} buses found</span>

                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                  >
                    <option value="price">Sort: Lowest Price</option>

                    <option value="departure">Sort: Earliest Departure</option>

                    <option value="rating">Sort: Highest Rating</option>
                  </select>
                </div>

                {filteredAndSortedBuses.length === 0 ? (
                  <div className="empty-state">
                    <h2>No buses match your filters</h2>

                    <p>Try changing your filters.</p>
                  </div>
                ) : (
                  <div className="bus-list">
                    {filteredAndSortedBuses.map((bus) => (
                      <div className="bus-card" key={bus.schedule_id}>
                        <div className="bus-main">
                          <div className="operator-section">
                            <h2>{bus.operator_name}</h2>

                            <p>{bus.bus_type}</p>

                            <span className="rating">
                              ★ {bus.operator_rating}
                            </span>
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
                )}
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
