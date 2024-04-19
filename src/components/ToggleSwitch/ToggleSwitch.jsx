import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="toggle-switch__box">
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <div
        className={`toggle-switch__circle${
          currentTemperatureUnit === "F"
            ? ` toggle-switch__circle_F`
            : ` toggle-switch__circle_C`
        }`}
      ></div>
      <p className="toggle-switch__text toggle-switch__text_F">F</p>
      <p className="toggle-switch__text toggle-switch__text_C">C</p>
    </label>
  );
}

export default ToggleSwitch;
