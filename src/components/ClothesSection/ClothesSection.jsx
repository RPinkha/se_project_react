import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__head">
        <p className="clothes-section__title">Your items</p>
        <button
          onClick={() => {
            handleAddClick();
          }}
          className="clothes-section__add-button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard onCardClick={onCardClick} key={item._id} item={item} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
