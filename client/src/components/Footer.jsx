const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About BusGo */}
        <div className="footer-column">
          <h3>About BusGo</h3>

          <ul>
            <li>Contact us</li>
            <li>Sitemap</li>
            <li>Offers</li>
          </ul>
        </div>

        {/* Info */}
        <div className="footer-column">
          <h3>Info</h3>

          <ul>
            <li>Privacy policy</li>
            <li>Blog</li>
            <li>Bus operator registration</li>
            <li>BusGo Bus</li>
            <li>Bus Timetable</li>
            <li>Report Security Issues</li>
          </ul>
        </div>

        {/* Global Sites */}
        <div className="footer-column">
          <h3>Indian Sites</h3>
          <ul>
            <li>Mumbai</li>
            <li>Pune</li>
            <li>Nagpur</li>
            <li>Amravati</li>
            <li>Nashik</li>
            <li>Kolhapur</li>
            <li>Warud</li>
            <li>Hyderabad</li>
          </ul>
        </div>

        {/* Partners */}
        <div className="footer-column">
          <h3>Our Partners</h3>

          <ul>
            <li>Bus Operators</li>
          </ul>
        </div>
      </div>

      {/* Bottom information */}
      <div className="footer-bottom">
        <div className="footer-brand">
          <span>BusGo</span>
        </div>

        <p>
          BusGo is an online bus ticket booking platform that makes bus travel
          simple, convenient and reliable. Search buses, choose your seat and
          book your journey online with ease.
        </p>
      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} BusGo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
