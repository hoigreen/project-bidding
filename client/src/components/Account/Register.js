import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./styles/account-style.css" 
import "../../styles/responstive.css" 

import Copyright from '../Common/Copyright';
import ToastMessage from '../Common/ToastMessage';

const RegisterPage = ({ socket }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    if (window.localStorage.getItem('usernameLogged')) {
        window.location.href = "/home"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("register", {
            username,
            password,
            balence: 0,
        });
        navigate('/');
        ToastMessage({ title: 'Đăng ký thành công', message: "Chúc mừng bạn đã đăng ký tài khoản thành công!", type: 'success' })
    };

    return (
        <div>
            <div id="toast"></div>
            <label className="login-page__title">Website đấu giá sản phẩm</label>
            <div className="login-page__container">
                <div className="login-page__panel hide-on-mobile"></div>

                <div className="login-page__col">
                    <form className="login-page__form" onSubmit={handleSubmit}>
                        <label className="login-page__label-login">Đăng ký tài khoản mới</label>

                        <label className="login-page__label" htmlFor="username">Vui lòng nhập tên tài khoản</label>
                        <input
                            type="text"
                            name="username"
                            className="login-page__input"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            minLength={5}
                            placeholder="Username ..." />

                        <label className="login-page__label login-page__label--password" htmlFor="password">Vui lòng nhập mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="login-page__input"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            minLength={6}
                            placeholder="Password ..." />

                        <label className="login-page__label login-page__label--password" htmlFor="password">Vui lòng xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="login-page__input"
                            required
                            minLength={6}
                            placeholder="Password ..." />

                        <button className="login-page__btn">ĐĂNG KÝ</button>
                    </form>

                    <label className="login-page__label-or">___ hoặc ___</label>
                    <div className="register__direct">
                        <div>
                            <label className="register__question">Nếu bạn đã có tài khoản rồi?</label>
                            <a className="register__back-login" onClick={e => navigate("/")}> Đăng nhập</a>
                        </div>
                    </div>
                </div>
            </div>
            <Copyright />
        </div >
    );

};

export default RegisterPage;