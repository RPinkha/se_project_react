import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

//components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";

//styles
import "./App.css";

//constants
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { apiKey, coordinates } from "../../utils/constants";

//contexts
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("card-preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
            handleAddClick={handleAddClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main weatherData={weatherData} onCardClick={handleCardClick} />
              }
            />
            <Route
              path="/profile"
              element={<Profile onCardClick={handleCardClick} />}
            />
          </Routes>
          <Footer />
        </div>
        <ModalWithForm
          buttonText="Add garment"
          formTitle="New garment"
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "add-garment"}
        >
          <label htmlFor="Name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="Name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="ImageURL" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="ImageURL"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select weather type:</legend>
            <label
              htmlFor="Hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="Hot"
                name="weather type"
              />
              Hot
            </label>
            <label
              htmlFor="Warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="Warm"
                name="weather type"
              />
              Warm
            </label>
            <label
              htmlFor="Cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="Cold"
                name="weather type"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          card={selectedCard}
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "card-preview"}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
