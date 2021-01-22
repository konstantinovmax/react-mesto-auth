import React from 'react';

function Login() {
    return (
        <section className="authorization">
            <form className="authorization__form">
                <h2 className="authorization__title">Вход</h2>
                <input className="authorization__input" type="email" placeholder="Email" required></input>
                <input className="authorization__input" type="password" placeholder="Пароль" required></input>
                <button className="authorization__submit-button">Войти</button>
            </form>
        </section>
    );
}

export default Login;