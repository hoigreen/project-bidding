import React, { memo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';
import NavMobile from '../nav/NavMobile';
import Copyright from '../common/Copyright';

const AddProduct = ({ socket }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [time, setTime] = useState(0)

    const navigate = useNavigate()

    const getTime = new Date().getTime();
    const currentTime = new Date(getTime);
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const currentTimestamp = Date.now()
    const dateStart = new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(currentTimestamp)

    const [hour, setHour] = useState(currentHour);
    const [date, setDate] = useState(dateStart);


    const [start, setTimeStart] = useState(currentMinute);
    const end = currentMinute + Number(time);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localStorage.getItem('usernameLogged')) {
            socket.emit("addProduct", {
                name,
                hour,
                date,
                start,
                time,
                end,
                price,
                owner: localStorage.getItem('usernameLogged'),
                is_bidded: false
            });
            navigate('/bidding')
        } else {
            alert("Vui lòng đăng nhập để thêm sản phẩm muốn đấu giá!")
        }
    };

    return (
        <React.Fragment>
            <Nav />
            <NavMobile />
            <div className="add-product__container">
                <h2 className="add-product__title">Thêm một sản phẩm mới</h2>
                <form className="add-product__form" onSubmit={handleSubmit}>
                    <label htmlFor="name" className='add-product__label'>Tên sản phẩm</label>
                    <input
                        type="text"
                        autoComplete='off'
                        name="name"
                        className='add-product__input'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="price" className='add-product__label'>Giá khởi điểm</label>
                    <input
                        type="number"
                        name="price"
                        className='add-product__input'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                    <label htmlFor="price" className='add-product__label'>Thời gian đấu giá (phút)</label>
                    <input
                        type="number"
                        name="Time"
                        className='add-product__input'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />

                    <button className="add-product__btn">Thêm sản phẩm</button>
                </form>
            </div>
            <Copyright />
        </React.Fragment>
    );
};

export default memo(AddProduct);
