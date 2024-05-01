import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ handleCloseClick, isOpen }) {
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""} modal_add-clothes`}>
      <div className="modal__container modal__container_delete-confirmation"></div>
    </div>
  );
}

export default DeleteConfirmationModal;
