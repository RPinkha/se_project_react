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

//styles
import "./App.css";

//constants
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem, getUserInfo } from "../../utils/api";
import { apiKey } from "../../utils/constants";

//contexts
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";

//util
import * as auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";

function App() {
  const [userData, setUserData] = useState({ name: "", avatar: "" });
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

  //authorization state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddSubmit = ({ name, weatherType, imageUrl }) => {
    addItem(name, weatherType, imageUrl)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    console.log(card);
    deleteItem(card._id)
      .then(() => {
        setClothingItems((currentItems) =>
          currentItems.filter((item) => item._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          const {
            token,
            user: { name, avatar },
          } = data;
          setToken(token);
          setUserData({ name, avatar });
          setIsLoggedIn(true);
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register(email, password, name, avatar)
      .then(() => {
        closeActiveModal();
        handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    auth
      .modify(name, avatar)
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    getUserInfo(token)
      .then(({ name, avatar }) => {
        setIsLoggedIn(true);
        setUserData({ name, avatar });
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
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
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
          />
          <LoginModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "login"}
            onLoginSubmit={handleLogin}
            onSignupClick={handleRegisterClick}
          />
          <RegisterModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "registration"}
            onRegisterSubmit={handleRegistration}
            onLoginClick={handleLoginClick}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
