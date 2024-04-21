import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section__head">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-button">+ Add new</button>
      </div>
      <ul className="clothes-section__cards__list">
        {defaultClothingItems.map((item) => {
          return <ItemCard key={item._id} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
