import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';
import NavMobile from '../nav/NavMobile';
import Copyright from '../common/Copyright';


const FundPage = ({ socket }) => {
    const [userName, setUserName] = useState();
    const [userBalance, setuserBalance] = useState(0)
    const [balance, setBalance] = useState(0)
    const [users, setUser] = useState([])

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
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

    })

    const handleClickRefresh = (e) => {
        e.preventDefault();
        window.location.href = window.location.href
    };
    const handleClickButtonFund = (e) => {
        e.preventDefault();
        fund();
        const userLastBidder = window.localStorage.getItem("usernameLogged")
        socket.emit("fund", { username: userLastBidder, balence: balance })
        window.confirm("Chúc mừng bạn đã nạp tiền thành công vào tài khoản")
        window.location.href = window.location.href
    };

    const fund = () => {
        setBalance(Number(prev => prev + balance));
    }

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
                            <div className='fund__person-balence'>{userBalance} <span>$</span></div>
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