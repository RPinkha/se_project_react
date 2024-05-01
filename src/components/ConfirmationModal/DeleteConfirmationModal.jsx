import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  handleCloseClick,
  isOpen,
  handleCardDelete,
  card,
}) {
  return (
    <div
      className={`modal${
        isOpen ? " modal_opened" : ""
      } modal_delete-confirmation`}
    >
      <div className="modal__container modal__container_delete-confirmation">
        <button
          type="button"
          className="modal__close modal-confirmation__close"
          onClick={handleCloseClick}
        />
        <p className="modal-confirmation__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          type="button"
          className="modal-confirmation__delete"
          onClick={() => handleCardDelete(card)}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal-confirmation__cancel"
          onClick={handleCloseClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
