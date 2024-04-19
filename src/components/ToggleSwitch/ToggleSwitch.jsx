import "./ToggleSwitch.css";

function ToggleSwitch() {
  return (
    <div class="toggle-switch">
      <label className="toggle-switch__box">
        <input className="toggle-switch__checkbox" type="checkbox" />
        <div className="toggle-switch__circle toggle-switch__circle_C"></div>
        <p className="toggle-switch__text toggle-switch__text_F">F</p>
        <p className="toggle-switch__text toggle-switch__text_C">C</p>
      </label>
    </div>
  );
}

export default ToggleSwitch;
