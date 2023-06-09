import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./styles/funding-style.css"

import Nav from '../Common/Nav';
import NavMobile from '../Common/NavMobile';
import Copyright from '../Common/Copyright';


const FundPage = ({ socket }) => {
    const [userName, setUserName] = useState();
    const [userBalance, setuserBalance] = useState(0)
    const [balance, setBalance] = useState(0)
    const [users, setUser] = useState([])

    useEffect(() => {
        const fetchAPI = () => {
            fetch("https://bidding-server.onrender.com/api").then(res => res.json()).then(data => {
                setUser(data.users)
            })
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        users.map((user, index) => {
            if (user.username == window.localStorage.getItem('usernameLogged')) {
                setUserName(user.username)
                setuserBalance(user.balence)
            }
        })
    }, [users])

    const handleClickButtonFund = (e) => {
        e.preventDefault();
        setBalance(Number(prev => prev + balance));
        const userLastBidder = window.localStorage.getItem("usernameLogged")
        socket.emit("fund", { username: userLastBidder, balence: balance })
        window.confirm("Chúc mừng bạn đã nạp tiền thành công vào tài khoản")
        window.location.reload()
    };

    return (
        <div>
            <Nav socket={socket} />
            <NavMobile />
            <div className='fund__container'>
                <label className='fund__header'>Nạp tiền vào tài khoản</label>
                <div className='fund__box'>
                    <div className='fund__info'>
                        <div className='fund__person'>
                            <div className='fund__person-avatar'></div>
                            <p className='fund__person-username'>{userName}</p>
                        </div>
                        <div className='fund__balence'>
                            <div className='fund__balence-title'>Tổng số dư:</div>
                            <div className='fund__person-balence'>{userBalance.toLocaleString()} <span>VNĐ</span></div>
                        </div>
                    </div>
                    <div className='fund__item fund__tilte_cash'>Số tiền nạp:</div>
                    <input type='number'
                        placeholder='Nhập số tiền muốn nạp'
                        onChange={e => setBalance(Number(e.target.value))}
                        className='fund__input-cash'>
                    </input>
                    <button className="fund__btn" onClick={handleClickButtonFund}>Nạp tiền</button>
                </div>
            </div>
            <Copyright />
        </div>
    );

}

export default FundPage;