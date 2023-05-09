import React, { useEffect, useState, useContext } from 'react'
import EditButton from "../other/EditButton"
import TimeEnd from '../other/TimeEnd'
import TimeStart from '../other/TimeStart'
import { Link } from "react-router-dom"
import Nav from '../nav/Nav'
import NavMobile from '../nav/NavMobile'
import Copyright from '../common/Copyright'

const BiddingPage = ({ socket }) => {
    const [username, setUserName] = useState('');
    const [userBalance, setBalance] = useState(0)
    const [users, setUser] = useState([])
    const [fee, setFee] = useState()


    const [products, setProducts] = useState([])
    const [products2, setProducts2] = useState([])
    const [loading, setLoading] = useState(true)

    const [is_bidded, setIsBidded] = useState(false)

    const getTime = new Date().getTime();
    const currentTime = new Date(getTime);
    const currentHours = currentTime.getHours(); // lấy ra gio
    const currentMinute = currentTime.getMinutes(); // lấy ra phút

    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setProducts(data.products)
                setUser(data.users)
                setLoading(false)
            })
        }
        fetchProducts()
        test()
    }, [products2, fee])

    function test() {
        socket.on('addProductResponse', data => {
            setProducts2([data])
        })
    }

    useEffect(() => {
        {
            socket.on('bidProductResponse', data => {
                setFee(data)
                window.location.href = window.location.href
            })

            users.map((user, index) => {
                if (user.username == window.localStorage.getItem('usernameLogged')) {
                    setUserName(user.username)
                    setBalance(user.balence)
                }
            })

            // Kiểm tra sản phẩm đang đấu giá
            products.map((product, index) => {
                if (Number(product.start) == currentTime.getMinutes() && Number(product.hour) == Number(currentHours)) {
                    var timeCount = (product.end - product.start) * 10;
                    const x = setInterval(() => {
                        timeCount--;
                        const getRowOfTimeCount = document.querySelectorAll('tr')[index + 1];
                        const timeCountElement = getRowOfTimeCount.querySelectorAll('td')[3];
                        const getElementBid = getRowOfTimeCount.querySelectorAll('td')[6]
                        getElementBid.style.display = 'block';
                        getElementBid.style.border = 'none';

                        timeCountElement.innerHTML = `<span>${timeCount} giây</span>`

                        if (timeCount == 0) {
                            if (product.last_bidder != undefined) {
                                alert('Chúc mừng người chiến thắng của sản phẩm ' + product.name + ' là ' + product.last_bidder)
                                socket.on('bidProductResponse', data => {
                                    setIsBidded(true);
                                    window.location.href = window.location.href
                                })

                                // users
                                // socket.emit("bidProduct", {is_bidded})
                                // const newOwner = product.last_bidder;
                                // socket.emit("setOwner", { owner: newOwner });
                                window.location.href = window.location.href
                                getElementBid.style.display = 'none';
                            }
                            else {
                                alert('Sản phẩm ' + product.name + ' đã kết thúc thời gian đấu giá mà không tìm được người chiến thắng!')
                                window.location.href = window.location.href
                            }
                        }

                        if (timeCount < 0) {
                            clearInterval(x)
                        }
                    }, 1000)

                }
            })


            // show danh sách sản phẩm đang đấu giá
            products.map((product, index) => {
                if (Number(product.start) == currentTime.getMinutes() && Number(product.hour) == Number(currentHours)) {
                    const getParagraphEmpty = document.querySelector('.bidding__body-data--empty');
                    getParagraphEmpty.style.display = 'none';
                    const getRowOfProductData = document.querySelectorAll('tr')[index + 1];
                    const tdElement0 = getRowOfProductData.querySelectorAll('td')[0];
                    tdElement0.style.display = "table-cell";
                    const tdElement1 = getRowOfProductData.querySelectorAll('td')[1];
                    tdElement1.style.display = "table-cell";
                    const tdElement2 = getRowOfProductData.querySelectorAll('td')[2];
                    tdElement2.style.display = "table-cell";
                    const tdElement3 = getRowOfProductData.querySelectorAll('td')[3];
                    tdElement3.style.display = "table-cell";
                    const tdElement4 = getRowOfProductData.querySelectorAll('td')[4];
                    tdElement4.style.display = "table-cell";
                    const tdElement5 = getRowOfProductData.querySelectorAll('td')[5];
                    tdElement5.style.display = "table-cell";
                    const tdElement6 = getRowOfProductData.querySelectorAll('td')[6];
                    tdElement6.style.display = "table-cell";
                }
            })
        }
    })


    return (
        <div>
            <Nav />
            <NavMobile />
            <div className="bidding__container">
                <label className='bidding__title'>Sản phẩm đang đấu giá</label>
                <div className='bidding__table-container'>
                    <table>
                        <thead>
                            <tr style={{ backgroundColor: '#d6f5d6' }}>
                                <th>Chủ sở hữu</th>
                                <th>Tên sản phẩm</th>
                                <th>Thời gian mở phiên đấu giá</th>
                                <th>Thời gian đấu giá còn lại</th>
                                <th>Giá sản phẩm</th>
                                <th>Người đấu giá cuối</th>
                                <th>Đấu giá</th>
                            </tr>
                        </thead>
                        <tbody className="bidding__body-data">
                            {loading ? <tr><td>Loading...</td></tr> : products.map((product, index) => (
                                <tr className="bidding__row-data" key={index}>
                                    <td style={{ color: "#6600cc", fontWeight: 600, fontSize: 16 }}>{product.owner}</td>
                                    <td style={{ textAlign: "left", lineHeight: 1.5 }}>{product.name}</td>
                                    <td>{product.date} {product.hour}<TimeStart product={product} /></td>
                                    <td>--</td>
                                    <td style={{ color: "red", fontWeight: 600 }}>{product.price} $</td>
                                    <td style={{ background: "#ffe6e6" }}>{product.last_bidder || "None"}</td>
                                    <td style={{ display: "none" }}>{<EditButton socket={socket} product={product} />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="bidding__body-data--empty">Danh sách trống</p>
                    <Link to="/bidding/add" className='btn products__cta'>Thêm sản phẩm mới</Link>
                </div>
            </div>
            <Copyright />
        </div>
    )
}

export default BiddingPage
