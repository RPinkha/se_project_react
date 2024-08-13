import "./SideBar.css";
import avatar from "../../assets/Avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src={avatar} alt="User Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Ruven Pinkhasov</p>
      </div>
      <button type="button" className="sidebar__button">
        Change profile data
      </button>
      <button type="button" className="sidebar__button">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
