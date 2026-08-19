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

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("price");

  //Filter Options
  const filterOptions = [
    {
      id: "AC",
      label: "AC",
      icon: "▣",
    },
    {
      id: "SLEEPER",
      label: "SLEEPER",
      icon: "▤",
    },
    {
      id: "SEATER",
      label: "SEATER",
      icon: "▱",
    },
    {
      id: "NONAC",
      label: "NON AC",
      icon: "▰",
    },
    {
      id: "MORNING",
      label: "06:00-12:00",
      icon: "☀",
    },
    {
      id: "AFTERNOON",
      label: "12:00-18:00",
      icon: "☀",
    },
    {
      id: "EVENING",
      label: "18:00-24:00",
      icon: "☾",
    },
    {
      id: "HIGH_RATED",
      label: "High Rated Buses",
      icon: "☆",
    },
  ];

  const toggleFilter = (filterId) => {
    setSelectedFilters((current) => {
      if (current.includes(filterId)) {
        return current.filter((id) => id !== filterId);
      }

      return [...current, filterId];
    });
  };

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

    const typeFilters = selectedFilters.filter((filter) =>
      ["AC", "SLEEPER", "SEATER", "NONAC"].includes(filter),
    );

    const timeFilters = selectedFilters.filter((filter) =>
      ["MORNING", "AFTERNOON", "EVENING"].includes(filter),
    );

    const highRatedSelected = selectedFilters.includes("HIGH_RATED");

    // Bus type filters
    if (typeFilters.length > 0) {
      result = result.filter((bus) => {
        const busType = bus.bus_type.toLowerCase();

        return typeFilters.some((filter) => {
          if (filter === "AC") {
            return busType.includes("ac");
          }

          if (filter === "SLEEPER") {
            return busType.includes("sleeper");
          }

          if (filter === "SEATER") {
            return busType.includes("seater");
          }

          if (filter === "NONAC") {
            return busType.includes("non-ac") || busType.includes("non ac");
          }

          return false;
        });
      });
    }

    // Time filters
    if (timeFilters.length > 0) {
      result = result.filter((bus) => {
        const hour = Number(bus.departure_time.slice(0, 2));

        return timeFilters.some((filter) => {
          if (filter === "MORNING") {
            return hour >= 6 && hour < 12;
          }

          if (filter === "AFTERNOON") {
            return hour >= 12 && hour < 18;
          }

          if (filter === "EVENING") {
            return hour >= 18 && hour <= 23;
          }

          return false;
        });
      });
    }

    // High-rated buses
    if (highRatedSelected) {
      result = result.filter((bus) => Number(bus.operator_rating) >= 4.3);
    }

    // Price
    result = result.filter((bus) => Number(bus.base_price) <= maxPrice);

    // Sorting
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
  }, [buses, selectedFilters, maxPrice, sortBy]);

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
                  <h3>Filter buses</h3>

                  {selectedFilters.length > 0 && (
                    <button onClick={() => setSelectedFilters([])}>
                      Clear all
                    </button>
                  )}
                </div>

                <div className="filter-chips">
                  {filterOptions.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id);

                    return (
                      <button
                        key={filter.id}
                        type="button"
                        className={`filter-chip ${isSelected ? "active" : ""}`}
                        onClick={() => toggleFilter(filter.id)}
                      >
                        <span className="filter-chip-icon">{filter.icon}</span>

                        <span>{filter.label}</span>

                        {isSelected && (
                          <span className="filter-chip-close">×</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="filter-price">
                  <div className="filter-price-header">
                    <h4>Maximum Price</h4>
                    <span>₹{maxPrice}</span>
                  </div>

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
