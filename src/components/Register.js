import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const {email, value} = evt.target;
        this.setState({
            [email]: value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        
    }

    render() {
        return (
            <section className="authorization">
                <form className="authorization__form" onSubmit={this.handleSubmit}>
                    <h2 className="authorization__title">Регистрация</h2>
                    <input id="email" className="authorization__input" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" required></input>
                    <input if="password" className="authorization__input" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Пароль" required></input>
                    <button className="authorization__submit-button">Зарегистрироваться</button>
                    <div className="authorization__question-container">
                        <p className="authorization__question-text">Уже зарегистрированы?</p>
                        <Link to="/sign-in" className="authorization__link-to-signin">Войти</Link>
                    </div>
                </form>
            </section>
        );
    }
}

export default Register;