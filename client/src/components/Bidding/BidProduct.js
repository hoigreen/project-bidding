import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import "./styles/bidding-style.css"

import Nav from '../Common/Nav';
import NavMobile from '../Common/NavMobile';
import Copyright from '../Common/Copyright';

const BidProduct = ({ socket }) => {
    const { name, price } = useParams()
    const [amount, setAmount] = useState(price)

    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (amount > Number(price)) {
            socket.emit("bidProduct", { amount, last_bidder: localStorage.getItem("usernameLogged"), name, is_bidded: true })
            window.location.href = '/bidding'
        } else {
            setError(true)
        }
    }

    return (
        <React.Fragment>
            <Nav />
            <NavMobile />
            <div className='bid-product__container'>
                <h2 className='bid-product__title'>Đấu giá sản phẩm</h2>
                <form className="bid-product__form" onSubmit={handleSubmit}>
                    <div className='bid-product__form-group'>
                        <label className='bid-product__form-label'>Tên sản phẩm muốn đấu giá:</label>
                        <h3 className='bid-product__form-name'> {name}</h3>
                    </div>
                    <label htmlFor='amount' className='bid-product__form-label'>Giá tiền bạn muốn đấu:</label>
                    {error && <p style={{ color: "red", fontSize: "2rem", fontWeight: "bold" }}>Giá đặt phải lớn hơn giá: {price} VNĐ</p>}
                    <input type="number" name='amount' value={amount} onChange={e => setAmount(e.target.value)} className='bid-product__form-input' required />

                    <button className='bid-product__btn'>Đặt giá</button>
                </form>
            </div>
            <Copyright />
        </React.Fragment>
    )
}

export default BidProduct