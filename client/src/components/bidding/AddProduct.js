import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';
import NavMobile from '../nav/NavMobile';
import Copyright from '../common/Copyright';


const AddProduct = ({ socket }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [minutes, setMinutes] = useState(0)

    const navigate = useNavigate()

    const addMinutes = (date, minutes) => {
        return new Date(date.getTime() + minutes * 60000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date();
        if (localStorage.getItem('usernameLogged')) {
            socket.emit("addProduct", {
                owner: localStorage.getItem('usernameLogged'),
                name,
                timeStart: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                timeEnd: addMinutes(date, Number(minutes)).toJSON(),
                minutes,
                price,
                is_bidded: false
            });
            window.location.href = '/bidding'
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
                        name="minutes"
                        className='add-product__input'
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
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
