import React, { useEffect, useState } from 'react'
import EditButton from "../other/EditButton"
import Nav from '../nav/Nav'
import NavMobile from '../nav/NavMobile'
import Copyright from '../common/Copyright'

const BiddingPage = ({ socket }) => {
    const [products, setProducts] = useState([])
    const [boolExists, setBoolExists] = useState(false)
    var now = new Date()

    useEffect(() => {
        const fetchAPI = () => {
            fetch("https://bidding-server.onrender.com/api").then(res => res.json()).then(data => {
                setProducts(data.products)
            })
        }
        fetchAPI()
    }, [products])

    useEffect(() => {
        products.map((product, index) => {
            if (now.getTime() >= minusMinutes(new Date(product.timeEnd), Number(product.minutes)) && now.getTime() <= new Date(product.timeEnd).getTime()) {
                setBoolExists(true)
            }
        })
    }, [products])

    const minusMinutes = (date, minutes) => {
        return new Date(date.getTime() + 1 * 1000 - minutes * 60000);
    }

    return (
        <React.Fragment>
            <Nav />
            <NavMobile />
            <div className="bidding__container">
                <label className='bidding__title'>Sản phẩm đang đấu giá</label>
                <div className='bidding__table-container'>
                    <table className='bidding__table'>
                        <thead className='bidding__table-header'>
                            <tr style={{ backgroundColor: '#d6f5d6' }}>
                                <th>Chủ sở hữu</th>
                                <th>Tên sản phẩm</th>
                                <th>Thời gian kết thúc</th>
                                <th>Giá</th>
                                <th>Người đấu giá cuối</th>
                                <th>Đấu giá</th>
                            </tr>
                        </thead>

                        <tbody className="bidding__table-body">
                            {boolExists ?
                                products.map((product, index) => {
                                    if (now.getTime() >= minusMinutes(new Date(product.timeEnd), Number(product.minutes)) && now.getTime() <= new Date(product.timeEnd).getTime()) {
                                        return (
                                            <tr className="bidding__table-row" key={index}>
                                                <td style={{ color: "#6600cc", fontWeight: 600, fontSize: 16 }}>{product.owner}</td>
                                                <td style={{ textAlign: "left", lineHeight: 1.6 }}>{product.name}</td>
                                                <td>{String(new Date(product.timeEnd).getHours()) + ":" + String(new Date(product.timeEnd).getMinutes()) + ":" + String(new Date(product.timeEnd).getSeconds())} {product.timeStart}</td>
                                                <td style={{ color: "red", fontWeight: 600 }}>{Number(product.price).toLocaleString()} VNĐ</td>
                                                <td style={{ background: "#ffe6e6" }}>{product.last_bidder || "Không có"}</td>
                                                <td >{<EditButton product={product} />}</td>
                                            </tr>
                                        )
                                    }
                                })
                                : <tr className="bidding__body-data--empty">
                                    <td style={{ border: "none" }}>Danh sách trống ...</td>
                                </tr>
                            }
                        </tbody>
                    </table>

                </div>
                    <button className='add-product__btn' onClick={(() => window.location.href = "/bidding/add")}>Thêm sản phẩm mới</button>
            </div>
            <Copyright />
        </React.Fragment>
    )
}

export default BiddingPage
