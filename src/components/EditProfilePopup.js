import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            description
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm isOpen={props.isOpen} name="edit-profile" title="Редактировать профиль" onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="name-input" name="name" type="text" className="modal__input modal__input_type_name" required value={name} onChange={handleChangeName} placeholder="Введите имя" minLength="2" maxLength="40" />
            <span id="name-input-error" className="modal__input-error"></span>
            <input id="description-input" name="description" type="text" className="modal__input modal__input_type_description" required value={description} onChange={handleChangeDescription} placeholder="Введите описание" minLength="2" maxLength="200" />
            <span id="description-input-error" className="modal__input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;