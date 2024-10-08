import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

//components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../ConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

//styles
import "./App.css";

//constants
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { apiKey } from "../../utils/constants";

//contexts
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";

//util
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";

function App() {
  const [userData, setUserData] = useState({ name: "", avatar: "", _id: "" });
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("card-preview");
    setSelectedCard(card);
  };

  const handleCardDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("registration");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddSubmit = ({ name, weatherType, imageUrl }) => {
    setIsLoading(true);
    const token = getToken();
    api
      .addItem(name, weatherType, imageUrl, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    const token = getToken();
    api
      .deleteItem(card._id, token)
      .then(() => {
        setClothingItems((currentItems) =>
          currentItems.filter((item) => item._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          console.log(data.token);
          setToken(data.token);
          api
            .getUserInfo(data.token)
            .then(({ name, avatar, _id }) => {
              setIsLoggedIn(true);
              setUserData({ name, avatar, _id });
            })
            .catch(console.error);
          closeActiveModal();
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    auth
      .register(email, password, name, avatar)
      .then(() => {
        closeActiveModal();
        handleLogin({ email, password });
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleEditProfile = ({ name, avatar }) => {
    setIsLoading(true);
    const token = getToken();
    auth
      .modify(name, avatar, token)
      .then((data) => {
        closeActiveModal();
        setUserData({ name: data.name, avatar: data.avatar, _id: data._id });
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    api
      .getUserInfo(token)
      .then(({ name, avatar, _id }) => {
        setIsLoggedIn(true);
        setUserData({ name, avatar, _id });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider
      value={{ userData, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              toggleMobileMenu={toggleMobileMenu}
              isMobileMenuOpen={isMobileMenuOpen}
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onLikeClick={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onLikeClick={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddSubmit={handleAddSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "card-preview"}
            onDeleteClick={handleCardDeleteClick}
          />
          <DeleteConfirmationModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "delete-confirmation"}
            card={selectedCard}
            handleCardDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <LoginModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "login"}
            onLoginSubmit={handleLogin}
            onSignupClick={handleRegisterClick}
            isLoading={isLoading}
          />
          <RegisterModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "registration"}
            onRegisterSubmit={handleRegistration}
            onLoginClick={handleLoginClick}
            isLoading={isLoading}
          />
          <EditProfileModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            onEditProfileSubmit={handleEditProfile}
            isLoading={isLoading}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
