import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import auth from '../utils/auth';
import Register from './Register';
import InfoTooltip from './InfoTooltip';


function App() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({loaded: false})
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getDataApi().then(([profileData, cardsData]) => {
      setCurrentUser({...profileData, loaded: true})
      setCards(cardsData)
    }).catch(err => {
      console.error(err);
      setCurrentUser({loaded:true})
    });
  }, [])

  useEffect(() => {
    console.log({localStorage: localStorage.getItem('jwt')});
    if (localStorage.getItem('jwt')) {
      auth.checkDataUser(localStorage.getItem('jwt'))
        .then(({ data }) => {
console.log({data});
          
          setLoggedIn(true);
          setUserEmail(data?.email);
        })
        .then(() => navigate("/", { replace: true }))
    }
  }, [])
  const handleSignOut = () => {
    localStorage.clear('jwt');
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true)
  }
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
    setIsInfoTooltipOpen(false)
  }
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.error(err);
        })
    } else {
      api.deleteLike(card._id)
        .then(newCard => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(i => i._id !== card._id));
      })
      .catch(err => {
        console.error(err);
      })
  }
  const handleUpdateUser = ({ name, about }) => {
    api.setProfileInfo({ name, about }).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
      .catch(err => {
        console.error(err);
      })
  }
  const onUpdateAvatar = ({ link }) => {
    api.setProfileAvatar({ link }).then(link => {
      setCurrentUser(link)
      closeAllPopups()

    })
      .catch(err => {
        console.error(err);
      })

  }
  const handleAddPlace = ({ name, link }) => {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path='/'
            exact
            element={<ProtectedRouteElement
              element={Main} loggedIn={loggedIn}
              loaded={currentUser?.loaded}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />}
          />
          <Route
          exact
            path='/sign-in'
            element={<Login
              navigate={navigate}
              setUserEmail={setUserEmail}
              setLoggedIn={setLoggedIn}
              onInfoTooltipOpen={setIsInfoTooltipOpen}
            />}
          />
          <Route
          exact
            path='/sign-up'
            element={<Register
              navigate={navigate}
              setUserEmail={setUserEmail}
              onInfoTooltipOpen={setIsInfoTooltipOpen} />}
          />
          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddPlace}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpenConfig={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
