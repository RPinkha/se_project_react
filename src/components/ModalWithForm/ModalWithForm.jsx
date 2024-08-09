import "./ModalWithForm.css";

function ModalWithForm({
  children,
  formTitle,
  handleCloseClick,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        ></button>
        <p className="modal__title">{formTitle}</p>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
