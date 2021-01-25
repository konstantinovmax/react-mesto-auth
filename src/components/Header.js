import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header(props) {
    let { email } = props.userEmail;

    return (
        <Switch>
            <Route path="/cards">
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип сервиса Mesto" />
                    <div className="header__user-container">
                        <p className="header__user-data">{email}</p>
                        <button className="header__logout" onClick={props.signOut}>Выйти</button>
                    </div>
                </header>
            </Route>
            <Route path="/sign-up">
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип сервиса Mesto" />
                    <div className="header__user-container">
                        <Link to="/sign-in" className="header__authorization">Войти</Link>
                    </div>
                </header>
            </Route>
            <Route path="/sign-in">
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип сервиса Mesto" />
                    <div className="header__user-container">
                        <Link to="/sign-up" className="header__authorization">Регистрация</Link>
                    </div>
                </header>
            </Route>
        </Switch>
    );
}

export default Header;
