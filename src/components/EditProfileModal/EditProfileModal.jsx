import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import validator from "validator";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ handleCloseClick, isOpen, onEditProfileSubmit }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(true);

  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState(true);

  const { userData } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileSubmit({ name, avatar });
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
      setName(userData.name);
      setAvatar(userData.avatar);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      formTitle="Change profile data"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="Name"
        className={`modal__label${nameError ? "" : " modal__label_type_error"}`}
      >
        Name *
        <input
          type="text"
          className={`modal__input${
            nameError ? "" : " modal__input_type_error"
          }`}
          id="Edit=Profile-Name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label
        htmlFor="Avatar"
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
          id="Edit=Profile-Avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
      <button type="submit" className="modal__submit">
        Save Changes
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
