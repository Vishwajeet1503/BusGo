import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AirplaneSeatIcon,
  Search02Icon,
  TicketCheckIcon,
} from "@hugeicons/core-free-icons";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="home-page">
      <Header />

      <main>
        {/* HERO */}
        <section className="home-hero">
          <div className="home-hero-background">
            <div className="hero-city city-one"></div>
            <div className="hero-city city-two"></div>
            <div className="hero-hill hill-one"></div>
            <div className="hero-hill hill-two"></div>
          </div>

          <div className="home-hero-content">
            <div className="hero-text">
              <span className="hero-eyebrow">TRAVEL SMART • TRAVEL EASY</span>

              <h1>
                India's online
                <br />
                bus ticket booking
              </h1>

              <p>
                Search buses, choose your seat and book your journey
                effortlessly.
              </p>
            </div>

            <SearchForm />
          </div>
        </section>

        {/* OFFERS */}
        <section className="offers-section">
          <div className="offers-container">
            <div className="section-header">
              <div>
                <h2>Offers for you</h2>
                <p>Save more on your next journey</p>
              </div>

              <button className="view-more-button" type="button">
                View more
              </button>
            </div>

            <div className="offer-tabs">
              <button className="offer-tab active" type="button">
                All
              </button>

              {/*  
              <button className="offer-tab" type="button">
                Bus
              </button>

              <button className="offer-tab" type="button">
                Train
              </button>

              <button className="offer-tab" type="button">
                Hotel
              </button>
              */}
            </div>

            <div className="offers-grid">
              <article className="offer-card offer-card-one">
                <span className="offer-badge">BUS</span>

                <h3>Save up to ₹250</h3>

                <p>on your bus ticket booking</p>

                <small>Use code: BUS250</small>

                <div className="offer-decoration">₹</div>
              </article>

              <article className="offer-card offer-card-two">
                <span className="offer-badge">BUS</span>

                <h3>Save up to ₹300</h3>

                <p>on selected bus journeys</p>

                <small>Limited period offer</small>

                <div className="offer-decoration">%</div>
              </article>

              <article className="offer-card offer-card-three">
                <span className="offer-badge">NEW</span>

                <h3>First booking offer</h3>

                <p>Get exciting discounts on your first trip</p>

                <small>New users only</small>

                <div className="offer-decoration">★</div>
              </article>

              <article className="offer-card offer-card-four">
                <span className="offer-badge">DEAL</span>

                <h3>Travel for less</h3>

                <p>Enjoy special fares on popular routes</p>

                <small>Book your journey today</small>

                <div className="offer-decoration">→</div>
              </article>
            </div>
          </div>
        </section>

        {/* WHY BUSGO */}
        <section className="why-section">
          <div className="why-container">
            <div className="why-heading">
              <span>WHY BUSGO</span>
              <h2>Everything you need for a better journey</h2>
            </div>

            <div className="why-grid">
              <article className="why-card">
                <div className="why-icon">
                  <HugeiconsIcon
                    icon={Search02Icon}
                    size={30}
                    strokeWidth={1.5}
                  />
                </div>
                <h3>Easy Search</h3>
                <p>Find buses between your preferred cities in seconds.</p>
              </article>

              <article className="why-card">
                <div className="why-icon">
                  <HugeiconsIcon
                    icon={AirplaneSeatIcon}
                    size={30}
                    strokeWidth={1.5}
                  />
                </div>
                <h3>Choose Your Seat</h3>
                <p>Select the seat that works best for your journey.</p>
              </article>

              <article className="why-card">
                <div className="why-icon">
                  <HugeiconsIcon
                    icon={TicketCheckIcon}
                    size={30}
                    strokeWidth={1.5}
                  />
                </div>
                <h3>Simple Booking</h3>
                <p>Complete your booking through a simple and secure flow.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
