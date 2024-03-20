import { Children } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, formTitle }) {
  return (
    <div className="modal">
      <div className="modal__container">
        <button type="button" className="modal__close"></button>
        <p className="modal__title">{formTitle}</p>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
