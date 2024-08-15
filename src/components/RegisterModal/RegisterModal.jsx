import { useEffect, useState } from "react";
import validator from "validator";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  handleCloseClick,
  isOpen,
  onRegisterSubmit,
  onLoginClick,
  isLoading,
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(true);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(true);

  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit({ email, password, name, avatar });
  };

  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
    const isValid = validateEmail(newValue);
    setEmailError(isValid);
  };

  const validateEmail = (input) => {
    return validator.isEmail(input);
  };

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    const isValid = validatePassword(newValue);
    setPasswordError(isValid);
  };

  const validatePassword = (input) => {
    return validator.isLength(input, { min: 6 });
  };

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setName(newValue);
    const isValid = validateName(newValue);
    setNameError(isValid);
  };

  const validateName = (input) => {
    return !validator.isEmpty(input, { ignore_whitespace: true });
  };

  const handleAvatarChange = (e) => {
    const newValue = e.target.value;
    setAvatar(newValue);
    const isValid = validateAvatar(newValue);
    setAvatarError(isValid);
  };

  const validateAvatar = (input) => {
    const regex =
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|apng|avif|svg|webp)(?:\?.*)?)$/i;
    return regex.test(input);
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      formTitle="Sign Up"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="Signup-Email"
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
          id="Signup-Email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label
        htmlFor="Signup-Password"
        className={`modal__label${
          passwordError ? "" : " modal__label_type_error"
        }`}
      >
        Password *
        <input
          type="password"
          className={`modal__input${
            passwordError ? "" : " modal__input_type_error"
          }`}
          id="Signup-Password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label
        htmlFor="Signup-Name"
        className={`modal__label${nameError ? "" : " modal__label_type_error"}`}
      >
        Name *
        <input
          type="text"
          className={`modal__input${
            nameError ? "" : " modal__input_type_error"
          }`}
          id="Signup-Name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label
        htmlFor="Signup-Avatar"
        className={`modal__label${
          avatarError ? "" : " modal__label_type_error"
        }`}
      >
        Avatar URL *
        <input
          type="url"
          className={`modal__input${
            avatarError ? "" : " modal__input_type_error"
          }`}
          id="Signup-Avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
      <div className="modal__buttons">
        <button type="submit" className="modal__submit">
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
        {!isLoading && (
          <button
            type="button"
            className="modal__second-option"
            onClick={onLoginClick}
          >
            or Log In
          </button>
        )}
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
