import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ handleCloseClick, isOpen, onAddSubmit }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlError, setImageUrlError] = useState(false);

  const [weatherType, setWeatherType] = useState("");

  const validateName = () => {
    const isValid = name.trim() !== "";
    setNameError(isValid);
  };

  const validateImageUrl = () => {
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
    const isValid = regex.test(imageUrl);
    setImageUrlError(isValid);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateName();
  };

  const handleImageUrlChange = (e) => {
    const newValue = e.target.value;
    setImageUrl(newValue);
    const isValid = /^(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(newValue);
    setImageUrlError(isValid);
    console.log(imageUrlError);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSubmit({ name, weatherType, imageUrl });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Add garment"
      formTitle="New garment"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="Name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="Name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="ImageURL" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="ImageURL"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
        />
      </label>
      <fieldset className="modal__fieldset" required>
        <legend className="modal__legend">Select weather type:</legend>
        <label htmlFor="Hot" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Hot"
            name="weather type"
            value="hot"
            onChange={handleWeatherTypeChange}
          />
          Hot
        </label>
        <label htmlFor="Warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Warm"
            name="weather type"
            value="warm"
            onChange={handleWeatherTypeChange}
          />
          Warm
        </label>
        <label htmlFor="Cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Cold"
            name="weather type"
            value="cold"
            onChange={handleWeatherTypeChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
