import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ handleCloseClick, isOpen, onAddSubmit, isLoading }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(true);

  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlError, setImageUrlError] = useState(true);

  const [weatherType, setWeatherType] = useState("");

  const validateName = (input) => {
    return input.trim() !== "";
  };

  const validateImageUrl = (input) => {
    const regex =
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|apng|avif|svg|webp)(?:\?.*)?)$/i;
    return regex.test(input);
  };

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setName(newValue);
    const isValid = validateName(newValue);
    setNameError(isValid);
  };

  const handleImageUrlChange = (e) => {
    const newValue = e.target.value;
    setImageUrl(newValue);
    const isValid = validateImageUrl(newValue);
    setImageUrlError(isValid);
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
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      formTitle="New garment"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="AddItem-Name"
        className={`modal__label${nameError ? "" : " modal__label_type_error"}`}
      >
        Name
        <input
          type="text"
          className={`modal__input${
            nameError ? "" : " modal__input_type_error"
          }`}
          id="AddItem-Name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label
        htmlFor="AddItem-ImageURL"
        className={`modal__label${
          imageUrlError ? "" : " modal__label_type_error"
        }`}
      >
        Image
        <input
          type="url"
          className={`modal__input${
            imageUrlError ? "" : " modal__input_type_error"
          }`}
          id="AddItem-ImageURL"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
        />
      </label>
      <fieldset className="modal__fieldset" required>
        <legend className="modal__legend">Select weather type:</legend>
        <label
          htmlFor="AddItem-Hot"
          className="modal__label modal__label_type_radio"
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="AddItem-Hot"
            name="weather type"
            value="hot"
            onChange={handleWeatherTypeChange}
          />
          Hot
        </label>
        <label
          htmlFor="AddItem-Warm"
          className="modal__label modal__label_type_radio"
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="AddItem-Warm"
            name="weather type"
            value="warm"
            onChange={handleWeatherTypeChange}
          />
          Warm
        </label>
        <label
          htmlFor="AddItem-Cold"
          className="modal__label modal__label_type_radio"
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="AddItem-Cold"
            name="weather type"
            value="cold"
            onChange={handleWeatherTypeChange}
          />
          Cold
        </label>
      </fieldset>
      <button type="submit" className="modal__submit">
        {isLoading ? "Adding garment..." : "Add garment"}
      </button>
    </ModalWithForm>
  );
}

export default AddItemModal;
