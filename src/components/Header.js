import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header() {
    return (
        <header className="header">
            <Link to="/cards"><img className="header__logo" src={logo} alt="Логотип сервиса Mesto" /></Link>
            <Link to="/sign-up" className="header__authorization">Регистрация</Link>
        </header>
    );
}

export default Header;