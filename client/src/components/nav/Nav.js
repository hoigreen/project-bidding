import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const [users, setUser] = useState([])
    const [username, setUserName] = useState('');
    const [userBalance, setBalance] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://bidding-server.onrender.com/api")
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
    },[users])

    const handleLogOut = (e) => {
        e.preventDefault();
        if (window.confirm("Bạn muốn đăng xuất tài khoản này!") == true) {
            navigate("/")
        }
        window.localStorage.removeItem("usernameLogged")
    }

    return (
        <nav id="nav">
            <label className="nav__logo" onClick={(e) => {
                e.preventDefault();
                navigate('/home');
            }}>Đấu giá sản phẩm</label>

            <div className="nav__group ">
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
                    {window.localStorage.getItem('usernameLogged') ?
                        <>
                            <div className="nav__account-info">
                                <p className="nav__account-name">{username}</p>
                                <span className='nav__account-char'>-</span>
                                <p className="nav__account-balence">{Number(userBalance).toLocaleString() || ""} VNĐ</p>
                            </div>
                            <button className="nav__account-btn nav__account-btn--register hide-on-mobile" onClick={handleLogOut}>
                                Đăng xuất
                                <i className="nav__account-btn-icon ti-arrow-right"></i>
                            </button>
                        </>
                        : <>
                            <button className="nav__account-btn nav__account-btn--login" onClick={() => { navigate("/") }}>Đăng nhập</button>
                            <button className="nav__account-btn nav__account-btn--register" onClick={() => { navigate("/register") }}>Đăng ký</button>
                        </>
                    }
                </div>
            </div>
        </nav>
    );
};

export default memo(Nav);