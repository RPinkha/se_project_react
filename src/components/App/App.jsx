import { useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm buttonText="Add garment" formTitle="New garment">
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
          <label htmlFor="Hot" className="modal__label modal__label_type_radio">
            <input
              className="modal__radio-input"
              type="radio"
              id="Hot"
              name="weather type"
            ></input>
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
            ></input>
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
            ></input>
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
