import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeftRightIcon,
  Search01Icon,
  Location01Icon,
  Calendar03Icon,
  MapPinHouseIcon,
  MapPinCheckInsideIcon,
} from "@hugeicons/core-free-icons";

const SearchForm = () => {
  const navigate = useNavigate();

  const getToday = () => {
    const today = new Date();

    return today.toISOString().split("T")[0];
  };

  const getTomorrow = () => {
    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow.toISOString().split("T")[0];
  };

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(getToday());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!from || !to || !date) {
      return;
    }

    const params = new URLSearchParams({
      from,
      to,
      date,
    });

    navigate(`/search?${params.toString()}`);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const selectToday = () => {
    setDate(getToday());
  };

  const selectTomorrow = () => {
    setDate(getTomorrow());
  };

  const formatDate = (value) => {
    if (!value) return "";

    const selectedDate = new Date(`${value}T00:00:00`);

    return selectedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <form className="bus-search-box" onSubmit={handleSubmit}>
      <div className="search-field">
        <span className="search-field-icon">
          <HugeiconsIcon icon={MapPinHouseIcon} size={24} strokeWidth={1.8} />
        </span>

        <div className="search-field-content">
          <label htmlFor="from">From</label>

          <input
            id="from"
            type="text"
            placeholder="Enter source"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            required
          />
        </div>
      </div>

      <button type="button" className="swap-button" onClick={swapLocations}>
        <HugeiconsIcon icon={ArrowLeftRightIcon} size={20} strokeWidth={2} />
      </button>

      <div className="search-field">
        <span className="search-field-icon">
          <HugeiconsIcon icon={MapPinCheckInsideIcon} size={24} strokeWidth={1.8} />
        </span>

        <div className="search-field-content">
          <label htmlFor="to">To</label>

          <input
            id="to"
            type="text"
            placeholder="Enter destination"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="search-field date-field">
        <span className="search-field-icon"></span>

        <div className="search-field-content">
          <label htmlFor="journey-date">Date of Journey</label>

          <input
            id="journey-date"
            type="date"
            min={getToday()}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          <span className="formatted-date">{formatDate(date)}</span>
        </div>

        <div className="date-shortcuts">
          <button
            type="button"
            className={date === getToday() ? "date-chip active" : "date-chip"}
            onClick={selectToday}
          >
            Today
          </button>

          <button
            type="button"
            className={
              date === getTomorrow() ? "date-chip active" : "date-chip"
            }
            onClick={selectTomorrow}
          >
            Tomorrow
          </button>
        </div>
      </div>

      <button type="submit" className="search-button">
        <HugeiconsIcon icon={Search01Icon} size={20} strokeWidth={2} />
        <span>Search Buses</span>
      </button>
    </form>
  );
};

export default SearchForm;
