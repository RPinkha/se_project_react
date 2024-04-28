import "./ItemModal.css";

export default function ItemModal({
  card,
  handleCloseClick,
  isOpen,
  handleCardDelete,
}) {
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__container modal__container_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__information">
          <p className="modal__information-title">{card.name}</p>
          <p className="modal__information-weather">Weather: {card.weather}</p>
        </div>
        <button
          type="button"
          className="modal__delete-card"
          onClick={() => handleCardDelete(card)}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}
