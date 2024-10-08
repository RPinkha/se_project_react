import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/Logo.svg";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Header({
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
  weatherData,
  toggleMobileMenu,
  isMobileMenuOpen,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const Image = ({ src, alt, className, fallback }) => {
    const [error, setError] = useState(false);

    const onError = () => {
      setError(true);
    };

    return error ? (
      fallback
    ) : (
      <img src={src} alt={alt} className={className} onError={onError} />
    );
  };

  const { userData, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div
        className={`header__user-menu ${
          isMobileMenuOpen
            ? "header__user-menu_open"
            : "header__user-menu_closed"
        }`}
      >
        <button
          className="header__user-menu-close"
          onClick={toggleMobileMenu}
        />
        <div className="header__user-menu-buttons">
          <ToggleSwitch />
          {isLoggedIn && (
            <button
              className="header__button header__button_add-clothes"
              onClick={() => {
                handleAddClick();
                toggleMobileMenu();
              }}
            >
              + Add clothes
            </button>
          )}
          {!isLoggedIn && (
            <button
              className={"header__button header__button_sign-up"}
              onClick={() => {
                handleRegisterClick();
                toggleMobileMenu();
              }}
            >
              Sign Up
            </button>
          )}
          {!isLoggedIn && (
            <button
              className="header__button header__button_log-in"
              onClick={() => {
                handleLoginClick();
                toggleMobileMenu();
              }}
            >
              Log In
            </button>
          )}
        </div>
        {isLoggedIn && (
          <Link
            to="/profile"
            className="header__link"
            onClick={toggleMobileMenu}
          >
            <div className="header__user-container">
              <p className="header__username">{userData.name}</p>
              <Image
                src={userData.avatar}
                alt="User Avatar"
                className="header__avatar"
                fallback={
                  <div className="header__avatar header__avatar_default">
                    {userData.name.slice(0, 1)}
                  </div>
                }
              />
            </div>
          </Link>
        )}
      </div>
      <button className="header__user-menu-toggle" onClick={toggleMobileMenu} />
      <div
        className={`header__user-menu-line header__user-menu-line_top${
          isMobileMenuOpen ? " header__user-menu-line_top-rotate" : ""
        }`}
      />
      <div
        className={`header__user-menu-line header__user-menu-line_bottom${
          isMobileMenuOpen ? " header__user-menu-line_bottom-rotate" : ""
        }`}
      />
    </header>
  );
}

export default Header;
