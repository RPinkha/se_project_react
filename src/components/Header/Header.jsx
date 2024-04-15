import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.png";

function Header({
  handleAddClick,
  weatherData,
  toggleMobileMenu,
  isMobileMenuOpen,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
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
        <button className="header__add-clothes-button" onClick={handleAddClick}>
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="User Avatar" className="header__avatar" />
        </div>
      </div>
      <button
        className="header__mobile-menu-toggle"
        onClick={toggleMobileMenu}
      />
    </header>
  );
}

export default Header;
