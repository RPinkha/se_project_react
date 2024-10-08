import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  handleAddClick,
  handleEditProfileClick,
  clothingItems,
  onLikeClick,
}) {
  return (
    <div className="profile">
      <SideBar handleEditProfileClick={handleEditProfileClick} />
      <ClothesSection
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        onLikeClick={onLikeClick}
      />
    </div>
  );
}

export default Profile;
