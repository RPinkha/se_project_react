import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const { userData } = useContext(CurrentUserContext);

  const filteredClothingItems = clothingItems.filter((clothingItem) => {
    return clothingItem.owner === userData._id;
  });

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
        {filteredClothingItems.map((item) => {
          return (
            <ItemCard onCardClick={onCardClick} key={item._id} item={item} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
