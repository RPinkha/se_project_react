import "./WeatherCard.css";
import weatherImage from "../../assets/Weather - Day/Clear Day.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temperature">75° F</p>
      <img src={weatherImage} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
