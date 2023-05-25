import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'

const BidProduct = ({ socket, product }) => {
    const [username, setUserName] = useState('');
    const [userBalance, setBalance] = useState(0)
    const [users, setUser] = useState([])

    const getTime = new Date().getTime();
    const currentTime = new Date(getTime);

    const { name, price, end, time} = useParams()
    const [amount, setAmount] = useState(price)
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchProducts = () => {
            fetch("https://bidding-server.onrender.com/api").then(res => res.json()).then(data => {
                setUser(data.users)
            })
        }
        fetchProducts()
        
    }, [])

    useEffect(() => {
        {
            users.map((user, index) => {
                if (user.username == window.localStorage.getItem('usernameLogged')) {
                    setUserName(user.username)
                    setBalance(user.balence)
                }
            })
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        const userLastBidder = localStorage.getItem("usernameLogged")
        if (amount > Number(price) ) {
            socket.emit("bidProduct", { amount, last_bidder: userLastBidder, name})
            window.location.href = '/products'
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <label className="user-login">
                <div className="user-login-info">
                    Tài khoản: <div className="user-login-name">{username}</div>
                    <p className="user-login-name"></p>
                    - Số dư hiện tại: <div className="user-login-balence">{userBalance}</div>
                    <p className="user-login-balence"></p>
                    $
                </div>
            </label>

            <div className='bidproduct__container'>
                <h2 className='bid-product-title'>Đấu giá sản phẩm</h2>
                <form className="bidProduct__form" onSubmit={handleSubmit}>
                    <div className='bid-product-label'>Tên sản phẩm muốn đấu giá:
                        <h3 className='bidProduct__name'> {name}</h3>
                    </div>
                    
                    <label htmlFor='amount' className='bid-product-price-label'>Giá tiền bạn muốn đấu:</label>
                    {error && <p style={{ color: "red" , fontSize: "2rem", fontWeight: "bold"}}>Giá đặt phải lớn hơn giá: {price} $</p>}
                    <input type="number" name='amount' value={amount} onChange={e => setAmount(e.target.value)} className='add-product-input' required />

                    <button className='bidProduct__cta btn'>Gửi</button>
                </form>
            </div>
        </div>
    )
}

export default BidProduct