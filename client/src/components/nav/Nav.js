import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');
const Nav = () => {
    const [users, setUser] = useState([])
    const [notification, setNotification] = useState('');

    const navigate = useNavigate()


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
        socket.on('bidProductResponse', (data) => {
            document.querySelector(".nav__notification").style.display = "block";
            document.querySelector(".nav__notification").style.animation = `notiAppear ease .5s, fadeOut linear 1s 5s forwards`;
            setNotification(
                `Tài khoản ${data.last_bidder} vừa đấu giá mua sản phẩm ${data.name} là $${Number(data.amount).toLocaleString()}`
            );
        });
    }, [socket]);

    useEffect(() => {
        socket.on('addProductResponse', (data) => {
            document.querySelector(".nav__notification").style.display = "block";
            document.querySelector(".nav__notification").style.animation = `notiAppear ease .5s, fadeOut linear 1s 5s forwards`;
            setNotification(
                `${data.owner} đã đấu giá sản phẩm ${data.name} với giá trị ${Number(data.price).toLocaleString()} VNĐ`
            );
        });
    }, [socket]);

    const handleLogOut = (e) => {
        e.preventDefault();
        if (window.confirm("Bạn muốn đăng xuất tài khoản này!") == true) {
            navigate("/")
        }
        window.localStorage.removeItem("usernameLogged")
    }

    return (
        <nav id="nav">
            <label className="nav__logo" onClick={(e) => { navigate('/home'); }}>Đấu giá sản phẩm</label>

            <div className="nav__notification">
                <div className="nav__notification-content">{notification}</div>
            </div>

            <div className="nav__group">
                <div className="nav__option hide-on-mobile">
                    <button className="nav__option-btn" onClick={(e) => { navigate('/bidding') }}>Đấu giá</button>
                    <button className="nav__option-btn" onClick={(e) => { navigate('/list'); }}>Sản phẩm</button>
                    <button className="nav__option-btn" onClick={(e) => {
                        if (window.localStorage.getItem("usernameLogged")) {
                            navigate('/fund');
                        } else alert("Vui lòng đăng nhập tài khoản để thực hiện nạp tiền!")
                    }}>Nạp tiền</button>
                    <button className="nav__option-btn" onClick={(e) => { navigate('/contact'); }}>Liên hệ</button>
                </div>

                {/* <div className="nav-notification">
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
                </div> */}

                <div className="nav__account">
                    {window.localStorage.getItem('usernameLogged') ?
                        users.map((user, index) => {
                            if (user.username == window.localStorage.getItem('usernameLogged')) {
                                return (
                                    <React.Fragment>
                                        <div className="nav__account-info">
                                            <p className="nav__account-name">{localStorage.getItem("usernameLogged")}</p>
                                            <span className='nav__account-char'>-</span>
                                            <p className="nav__account-balence">{Number(user.balence).toLocaleString() || ""} VNĐ</p>
                                        </div>
                                        <button className="nav__account-btn nav__account-btn--register hide-on-mobile" onClick={handleLogOut}>
                                            Đăng xuất
                                            <i className="nav__account-btn-icon ti-arrow-right"></i>
                                        </button>
                                    </React.Fragment>
                                )
                            }
                        }) :
                        <React.Fragment>
                            <button className="nav__account-btn nav__account-btn--login" onClick={() => { navigate("/") }}>Đăng nhập</button>
                            <button className="nav__account-btn nav__account-btn--register" onClick={() => { navigate("/register") }}>Đăng ký</button>
                        </React.Fragment>
                    }
                </div>
            </div>
        </nav>
    );
};

export default memo(Nav);