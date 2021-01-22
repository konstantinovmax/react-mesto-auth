import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" onClick={props.onEditAvatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__name-edit">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>           
                <button type="button" className="profile__add-button" onClick={props.onAddPlace} />
            </section>
            <section className="elements">
                { props.cards.map((card) => (
                    <Card 
                    card={card}
                    key={card._id}
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;