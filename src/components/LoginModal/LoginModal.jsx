import { useEffect, useState } from "react";
import validator from "validator";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  handleCloseClick,
  isOpen,
  onLoginSubmit,
  onSignupClick,
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit({ email, password });
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

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      formTitle="Log In"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="Email"
        className={`modal__label${
          emailError ? "" : " modal__label_type_error"
        }`}
      >
        Email
        <input
          type="text"
          className={`modal__input${
            emailError ? "" : " modal__input_type_error"
          }`}
          id="Signip-Email"
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
        Password
        <input
          type="password"
          className={`modal__input${
            passwordError ? "" : " modal__input_type_error"
          }`}
          id="Signin-Password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <div className="modal__buttons">
        <button type="submit" className="modal__submit">
          Log In
        </button>
        <button
          type="button"
          className="modal__second-option"
          onClick={onSignupClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
