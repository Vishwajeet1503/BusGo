import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <div>
      <Header />

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="hero-label">TRAVEL MADE SIMPLE</p>

            <h1>Your journey starts here.</h1>

            <p className="hero-description">
              Search buses, choose your seat and book your journey in just a few
              clicks.
            </p>

            <SearchForm />
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <p>Search and book your bus quickly.</p>
          </div>

          <div className="feature-card">
            <h3>Choose Your Seat</h3>
            <p>Select the seat that works best for you.</p>
          </div>

          <div className="feature-card">
            <h3>Manage Trips</h3>
            <p>View and manage your bookings easily.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
