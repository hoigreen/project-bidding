import React from "react"
import { useEffect, useState } from 'react'

import "./styles/list-page.css"

import Nav from "../Common/Nav"
import Copyright from "../Common/Copyright"
import NavMobile from "../Common/NavMobile"

const List = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = () => {
            fetch("https://bidding-server.onrender.com/api").then(res => res.json()).then(data => {
                setProducts(data.products)
                setLoading(false)
            })
        }
        fetchProducts()
    }, [])

    return (
        <React.Fragment>
            <Nav />
            <NavMobile />
            <div className="list__container">
                <label className='list__title'>Danh sách sản phẩm đang đấu giá</label>
                <div className='list__panel'></div>
                <div className='list__table-container'>
                    <div className='list__sort'>
                        <h2 className='list__sort-title'>Sắp xếp theo:</h2>
                        <button className='list__sort-btn'>từ A - Z </button>
                        <button className='list__sort-btn'>từ Z - A</button>
                        <button className='list__sort-btn'>Giá từ thấp - cao</button>
                        <button className='list__sort-btn'>Giá từ cao đến thấp</button>
                    </div>

                    <div className='list__products'>
                        {loading ?
                            <div className='list__item'>
                                <div className='list__item-img'></div>
                                <h3 className='list__item-title'>Loading...</h3>
                                <p className='list__item-price'>Loading...</p>
                            </div>
                            : products.map((list, index) => {
                                if (list.is_bidded)
                                    return (
                                        <div className='list__item'>
                                            <div className='list__item-img'></div>
                                            <h3 className='list__item-title'>{list.name}</h3>
                                            <p className='list__item-price'>Giá tiền: {list.price} VNĐ</p>
                                            <div className='list__item-favorite'>Yêu thích</div>
                                        </div>

                                    )
                            })
                        }
                    </div>
                </div>
            </div>
            <Copyright />
        </React.Fragment>
    )
}

export default List;