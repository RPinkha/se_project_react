import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ handleCloseClick, isOpen, onAddSubmit }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(true);

  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlError, setImageUrlError] = useState(true);

  const [weatherType, setWeatherType] = useState("");

  /* const validateName = (input) => {
    return input.trim() !== "";
  };

  const validateImageUrl = (input) => {
    const regex =
      /^(https?:\/\/[^\/]+\.(?:png|jpg|jpeg|gif|apng|avif|svg|webp))$/i;
    return regex.test(input);
  }; */

  /* const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setName(newValue);
    const isValid = validateName(newValue);
    setNameError(isValid);
  };
 */
  const handleImageUrlChange = (e) => {
    const newValue = e.target.value;
    setImageUrl(newValue);
    const isValid = validateImageUrl(newValue);
    setImageUrlError(isValid);
  };

  /*   const handleSubmit = (e) => {
    e.preventDefault();
    onAddSubmit({ name, weatherType, imageUrl });
  };
 */
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Sign Up"
      formTitle="Sign Up"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      //onSubmit={handleSubmit}
    >
      <label
        htmlFor="Email"
        className={`modal__label${
          emailError ? "" : " modal__label_type_error"
        }`}
      >
        Email *
        <input
          type="text"
          className={`modal__input${
            emailError ? "" : " modal__input_type_error"
          }`}
          id="Email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label
        htmlFor="Password"
        className={`modal__label${
          passwordError ? "" : " modal__label_type_error"
        }`}
      >
        Password *
        <input
          type="url"
          className={`modal__input${
            passwordError ? "" : " modal__input_type_error"
          }`}
          id="Password"
          placeholder="Password"
          value={Password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label
        htmlFor="Name"
        className={`modal__label${NameError ? "" : " modal__label_type_error"}`}
      >
        Name *
        <input
          type="url"
          className={`modal__input${
            NameError ? "" : " modal__input_type_error"
          }`}
          id="Name"
          placeholder="Name"
          value={Name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label
        htmlFor="Avatar"
        className={`modal__label${
          AvatarError ? "" : " modal__label_type_error"
        }`}
      >
        Avatar URL *
        <input
          type="url"
          className={`modal__input${
            imageUrlError ? "" : " modal__input_type_error"
          }`}
          id="Avatar"
          placeholder="Avatar URL"
          value={imageUrl}
          onChange={handleAvatrUrlChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default AddItemModal;
