import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <p className="cards__title">Today is 75° F / You may want to wear:</p>
      </section>
    </main>
  );
}

export default Main;
