import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  return (
    <li
      className="card"
      onClick={() => {
        handleCardClick(item);
      }}
    >
      <h2 className="card__title">{item.name}</h2>
      <img src={item.link} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
