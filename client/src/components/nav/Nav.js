import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('https://bidding-server.onrender.com');

const Nav = () => {
    const [users, setUser] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://bidding-server.onrender.com/api").then(res => res.json()).then(data => {
                setUser(data.users)
            })
                .catch(console.error);
        }
        fetchAPIs()
    }, [])

    // Thông báo đấu giá sản phẩm
    useEffect(() => {
        socket.on('bidProductResponse', (data) => {
            window.alert(`Tài khoản ${data.last_bidder} vừa đấu giá mua sản phẩm ${data.name} là $${Number(data.amount).toLocaleString()}`)
        });
    }, [socket]);

    // Thông báo thêm sản phẩm đáu giá mới
    useEffect(() => {
        socket.on('addProductResponse', (data) => {
            window.alert(`${data.owner} đã đấu giá sản phẩm ${data.name} với giá trị ${Number(data.price).toLocaleString()} VNĐ`)
        });

    }, [socket]);

    const handleLogOut = (e) => {
        e.preventDefault();
        if (window.confirm("Bạn muốn đăng xuất tài khoản này!") == true) {
            window.localStorage.removeItem("usernameLogged")
            navigate("/")
        }
    }

    return (
        <nav id="nav">
            <label className="nav__logo" onClick={(e) => { navigate('/home'); }}>Đấu giá sản phẩm</label>

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