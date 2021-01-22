import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeUrl, setPlaceUrl] = React.useState('');

    function handlePlaceNameChange(e) { 
        setPlaceName(e.target.value) 
    }

    function handlePlaceUrlChange(e) { 
        setPlaceUrl(e.target.value) 
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: placeName,
            description: placeUrl
        });
    } 

    return (
        <PopupWithForm isOpen={props.isOpen} name="add-element" title="Новое место" onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="name-input" name="name" type="text" className="modal__input modal__input_type_place" required value={placeName} onChange={handlePlaceNameChange} placeholder="Название" minLength="1" maxLength="30" />
            <span id="name-input-error" className="modal__input-error" />
            <input id="description-input" name="description" type="url" className="modal__input modal__input_type_url" required value={placeUrl} onChange={handlePlaceUrlChange} placeholder="Ссылка на картинку" />
            <span id="description-input-error" className="modal__input-error" />
        </PopupWithForm>
    );
}

export default AddPlacePopup;