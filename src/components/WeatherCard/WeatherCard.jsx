import "./WeatherCard.css";
import weatherImage from "../../assets/Weather - Day/Clear Day.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temperature">
        {weatherData.temp.F.toFixed(1)}° F
      </p>
      <img src={weatherImage} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
