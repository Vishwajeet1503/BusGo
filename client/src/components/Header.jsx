import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bus01Icon,
  Book02Icon,
  HelpCircleIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="busgo-logo">
          BusGo
        </Link>

        {/* Main Products */}
        <nav className="header-products">
          <Link to="/" className="header-product active">
            <HugeiconsIcon icon={Bus01Icon} size={20} strokeWidth={1.5} />
            <span>Bus</span>
          </Link>
        </nav>

        {/* Right Navigation */}
        <nav className="header-actions">
          {/* Bookings */}
          {isAuthenticated ? (
            <Link to="/dashboard" className="header-action">
              <HugeiconsIcon icon={Book02Icon} size={22} strokeWidth={1.5} />
              <span>Bookings</span>
            </Link>
          ) : (
            <Link to="/login" className="header-action">
              <HugeiconsIcon icon={Book02Icon} size={22} strokeWidth={1.5} />
              <span>Bookings</span>
            </Link>
          )}

          {/* Help */}
          <button className="header-action header-action-button">
            <HugeiconsIcon
              icon={HelpCircleIcon}
              size={22}
              strokeWidth={1.5}
            />
            <span>Help</span>
          </button>

          {/* User */}
          {isAuthenticated ? (
            <>
              <div className="header-action">
                <HugeiconsIcon
                  icon={UserCircleIcon}
                  size={22}
                  strokeWidth={1.5}
                />
                <span>{user?.name || "User"}</span>
              </div>

              {/* Logout */}
              <button
                className="header-action header-action-button logout-button"
                onClick={handleLogout}
              >
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="header-action">
              <HugeiconsIcon
                icon={UserCircleIcon}
                size={22}
                strokeWidth={1.5}
              />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;