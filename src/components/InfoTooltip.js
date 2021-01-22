import React from 'react';
import successfulAccess from '../images/done.svg';
import accessDenied from '../images/denied.svg';

function InfoTooltip() {
    return (
        <div className="modal">
            <div className="modal__container modal__container_type_signup-info">
                <button type="reset" className="modal__close-button modal__close-button_type-signup-info" />
                <img className="modal__access-status" src={successfulAccess}></img>
                <h2 className="modal__title">Вы успешно зарегистрировались!</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;