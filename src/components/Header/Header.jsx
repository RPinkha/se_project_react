import headerLogo from "../../assets/Logo.png";
import avatar from "../../assets/Avatar.png";

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date_and_location">Place Holder, Text</p>
      <button className="header__add_clothes_button">+ Add clothes</button>
    </header>
  );
}

export default Header;
