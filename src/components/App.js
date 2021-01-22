import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(newUserInfo) {
    api.patchEditProfile(newUserInfo)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(avatarName) {
    api.patchChangeAvatar(avatarName)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.postCard(cardInfo)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
          console.log(err);
      });
  }

  function handleCardDelete(card) {
      const isOwn = card.owner._id === currentUser._id;
      api.deleteCard(card._id, isOwn)
      .then(() => {
          const newCards = cards.filter((c) => card._id !== c._id);
          setCards(newCards);
      })
      .catch((err) => {
          console.log(err);
      });
  }


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);


   return (
    <>
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
          <div className="root__content">
            <Header />
            <Switch>
              <ProtectedRoute path='/cards' loggedIn={loggedIn} component={Main}>
                <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                />
              </ProtectedRoute>
              <Route path='/sign-up'>
                <Register />
              </Route>
              <Route path='/sign-in'>
                <Login />
              </Route>
              <Route exact path="/">
                {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <Footer />
            <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            />
            <InfoTooltip />         
          </div>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
