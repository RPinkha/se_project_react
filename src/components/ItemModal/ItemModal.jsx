import "./ItemModal.css";

export default function ItemModal({ activeModal, card, handleCloseClick }) {
  return (
    <div
      className={`modal${
        activeModal === "card-preview" ? " modal_opened" : ""
      }`}
    >
      <div className="modal__container modal__container_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        />
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__information">
          <p className="modal__information-title">{card.name}</p>
          <p className="modal__information-weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
