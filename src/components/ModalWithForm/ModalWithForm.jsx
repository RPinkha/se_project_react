import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  formTitle,
  handleCloseClick,
  isOpen,
}) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        handleCloseClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseClick]);

  return (
    <div className={`modal${isOpen ? " modal_opened" : ""} modal_add-clothes`}>
      <div className="modal__container modal__container_add-clothes">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        ></button>
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
