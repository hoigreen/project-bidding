import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ socket, product }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [time, setTime] = useState(0)
    
    const getTime = new Date().getTime();
    const currentTime = new Date(getTime);
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const currentTimestamp = Date.now()
    const dateStart = new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(currentTimestamp)

    const [hour, setHour] = useState(currentHour);
    const [date, setDate] = useState(dateStart);
    // Set thời gian bắt đầu và kết thúc
    const [start, setTimeStart] = useState(currentMinute);
    const end = currentMinute + Number(time);
    const [is_bidded, setIsBidded] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("addProduct", {
            name,
            hour,
            date,
            start,
            time,
            end,
            price,
            owner: localStorage.getItem('usernameLogged'),
            is_bidded
        });
        window.location.href = '/products'
    };

    return (
        <div>
            <div className="addproduct__container">
                <h2 className="add-product-title">Thêm một sản phẩm mới</h2>
                <form className="addProduct__form" onSubmit={handleSubmit}>
                    <label htmlFor="name" className='add-product-label'>Tên sản phẩm</label>
                    <input
                        type="text"
                        name="name"
                        className='add-product-input'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="price" className='add-product-label'>Giá khởi điểm</label>
                    <input
                        type="number"
                        name="price"
                        className='add-product-input'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                    <label htmlFor="price" className='add-product-label'>Thời gian đấu giá (phút)</label>
                    <input
                        type="number"
                        name="Time"
                        className='add-product-input'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />

                    <button className="addProduct__cta btn">Thêm sản phẩm</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
