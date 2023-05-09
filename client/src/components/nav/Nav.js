import React, { useState, useEffect } from 'react';

const Nav = ({ socket }) => {
    const [users, setUser] = useState([])
    const [username, setUserName] = useState('');
    const [userBalance, setBalance] = useState("")

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api")
                .then(res => res.json())
                .then(data => {
                    setUser(data.users)
                })
                .catch(console.error);
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        users.map((user, index) => {
            if (user.username == window.localStorage.getItem('usernameLogged')) {
                setUserName(user.username)
                setBalance(user.balence)
            }
        })
        hanleCheckLogin()
    })

    const hanleCheckLogin = () => {
        const account = document.querySelector(".nav__account")
        if (window.localStorage.getItem('usernameLogged')) {
            account.innerHTML = `
                <div class="nav__account-info">
                    <p class="nav__account-name">${username}</p>
                    <span class='nav__account-char'>-</span>
                    <p class="nav__account-balence">${Number(userBalance).toLocaleString() || ""} $</p>
                </div>
                <button class="nav__account-btn nav__account-btn--register hide-on-mobile">
                    Đăng xuất
                    <i class="nav__account-btn-icon ti-arrow-right"></i>
                </button>
            `
            const btnLogout = document.querySelector(".nav__account-btn.nav__account-btn--register")
            btnLogout.addEventListener("click", (e) => { handleLogOut(e) })
        }
        else {
            account.innerHTML = `
            <button class="nav__account-btn nav__account-btn--login">Đăng nhập</button>
            <button class="nav__account-btn nav__account-btn--register">Đăng ký</button>
            `
            const btnLogin = document.querySelector(".nav__account-btn--login")
            btnLogin.addEventListener("click", () => { window.location.href = "/" })
            const btnRegister = document.querySelector(".nav__account-btn--register")
            btnRegister.addEventListener("click", () => { window.location.href = "/register" })
        }
    }

    const handleLogOut = (e) => {
        e.preventDefault();
        if (window.confirm("Bạn muốn đăng xuất tài khoản này!") == true) {
            window.location.href = "/"
        }
        window.localStorage.removeItem("usernameLogged")
    }

    return (
        <nav id="nav">
            <label className="nav__logo" onClick={(e) => {
                e.preventDefault();
                window.location.href = '/home';
            }}>Đấu giá sản phẩm</label>

            <div className="nav__group ">
                <div className="nav__option hide-on-mobile">
                    <button className="nav__option-btn" onClick={(e) => { window.location.href = '/bidding'; }}>Đấu giá</button>
                    <button className="nav__option-btn" onClick={(e) => { window.location.href = '/list'; }}>Sản phẩm</button>
                    <button className="nav__option-btn" onClick={(e) => { window.location.href = '/fund'; }}>Nạp tiền</button>
                    <button className="nav__option-btn" onClick={(e) => { window.location.href = '/contact'; }}>Liên hệ</button>
                </div>
                <div className="nav-notification">
                    <button className="nav-notification__btn">
                        <i className="nav-notification__icon ti-bell"></i>
                    </button>
                    <div className="nav-notification__box">
                        <li className="nav-notification__item">
                            <label className="nav-notification__item-content">
                                <span className="nav-notification__owner">Mãnh Thú</span>
                                vừa thêm sản phẩm 
                                <span className="nav-notification__product">Iphone12</span>
                                vào danh sách đấu giá!
                            </label>
                            <p className="nav-notification__item-time">now</p>
                        </li>
                        <li className="nav-notification__item">
                            <label className="nav-notification__item-content">ManhThu</label>
                            <p className="nav-notification__item-time">now</p>
                        </li>
                    </div>
                </div>
                <div className="nav__account">
                </div>
            </div>
        </nav>
    );
};

export default Nav;