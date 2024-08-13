import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import avatar from "../../assets/Avatar.png";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { removeToken } from "../../utils/token";

function SideBar() {
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(CurrentUserContext);

  function signOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src={avatar} alt="User Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Ruven Pinkhasov</p>
      </div>
      <button type="button" className="sidebar__button">
        Change profile data
      </button>
      <button type="button" className="sidebar__button" onClick={signOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
