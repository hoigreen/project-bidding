import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Copyright from '../common/Copyright';

const Login = () => {
    const [users, setUsers] = useState([])

    const [details, setDetails] = useState({ username: "", password: "" })

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchAPI()
    }, [])

    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };
            const icons = {
                success: "ti-check-box",
                info: "ti-info",
                warning: "ti-close",
                error: "ti-close"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

            toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="ti-close"></i>
                      </div>
                  `;
            main.appendChild(toast);
        }
    }

    function showErrorToast() {
        toast({
            title: 'Đăng nhập thất bại',
            message: 'Tên tài khoản hoặc mật khẩu không chính xác!',
            type: 'error',
            duration: 3000
        })
    }

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
        showErrorToast();
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
                            <a
                                className="login-page__register"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = '/register';
                                }}
                            >
                                Đăng ký ngay</a>
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