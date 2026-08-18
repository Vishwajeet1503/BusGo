import { useState } from "react";

const SearchForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      from,
      to,
      date,
    });
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>From</label>

        <input
          type="text"
          placeholder="Enter source"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          required
        />
      </div>

      <button type="button" className="swap-button" onClick={swapLocations}>
        ⇄
      </button>

      <div className="input-group">
        <label>To</label>

        <input
          type="text"
          placeholder="Enter destination"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Journey Date</label>

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <button type="submit" className="search-button">
        Search Buses
      </button>
    </form>
  );
};

export default SearchForm;
