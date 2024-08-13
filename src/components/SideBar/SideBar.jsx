import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { removeToken } from "../../utils/token";

function SideBar({ handleEditProfileClick }) {
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

  const navigate = useNavigate();

  const { userData, setIsLoggedIn } = useContext(CurrentUserContext);

  function signOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <Image
          src={userData.avatar}
          alt="User Avatar"
          className="sidebar__avatar"
          fallback={
            <div className="sidebar__avatar sidebar__avatar_default">
              {userData.name.slice(0, 1)}
            </div>
          }
        />
        <p className="sidebar__username">{userData.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__button"
        onClick={handleEditProfileClick}
      >
        Change profile data
      </button>
      <button type="button" className="sidebar__button" onClick={signOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
