import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Copyright from '../common/Copyright';
import ToastMessage from '../other/ToastMessage';

const Login = () => {
    const [users, setUsers] = useState([])
    const [details, setDetails] = useState({ username: "", password: "" })

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = () => {
            fetch("https://bidding-server.onrender.com/api").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchAPI()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        users.map((user, index) => {
            if (details.username == user.username &&
                details.password == user.password) {
                navigate('/home');
                window.localStorage.setItem('usernameLogged', user.username);
                alert("Đăng nhập thành công");
            }
        })
        ToastMessage({ title: 'Đăng nhập thất bại', message: 'Tên tài khoản hoặc mật khẩu không chính xác!', type: 'error', duration: 3000 })
    };

    return (
        <div>
            <div id="toast"></div>
            <label className="login-page__title">Website đấu giá sản phẩm</label>
            <div className="login-page__container">
                <div className="login-page__col">
                    <form className="login-page__form" onSubmit={handleSubmit}>
                        <label className="login-page__label-login">Đăng nhập tài khoản</label>

                        <label className="login-page__label" htmlFor="username">Vui lòng nhập tên tài khoản</label>
                        <input
                            type="text"
                            name="username"
                            className="login-page__input"
                            onChange={e => setDetails({ ...details, username: e.target.value })}
                            value={details.username}
                            required
                            minLength={5}
                            placeholder="Username ..."
                        />

                        <label className="login-page__label login-page__label--password" htmlFor="password">Vui lòng nhập mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="login-page__input"
                            onChange={e => setDetails({ ...details, password: e.target.value })}
                            value={details.password}
                            required
                            minLength={6}
                            placeholder="Password ..."
                        />
                        <button className="login-page__btn">ĐĂNG NHẬP</button>
                    </form>

                    <label className="login-page__label-or">___ hoặc ___</label>

                    <div className="login-page__option">
                        <button className="login-page__btn-other">
                            <div className="login-page__btn-img login-page__btn-img--google"></div>
                            <label className="login-page__btn-label">Đăng nhập với Google</label>
                        </button>

                        <button className="login-page__btn-other">
                            <div className="login-page__btn-img login-page__btn-img--facebook"></div>
                            <label className="login-page__btn-label">Đăng nhập với Facebook</label>
                        </button>
                    </div>

                    <div className="login-page__direct">
                        <div>
                            <label className="login-page__question">Nếu bạn chưa có tài khoản trước đây?</label>
                            <a className="login-page__register" onClick={e => navigate("/register")}>Đăng ký ngay</a>
                        </div>

                    </div>

                </div>

                <div className="login-page__panel hide-on-mobile">
                </div>
            </div>
            <Copyright />
        </div>



    );
};

export default Login;