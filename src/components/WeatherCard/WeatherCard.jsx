import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const weatherOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  return (
    <section className="weather-card">
      <p className="weather-card__temperature">{weatherData.temp.F}° F</p>
      <img
        src={weatherOption[0]?.url}
        alt={weatherOption[0]?.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
