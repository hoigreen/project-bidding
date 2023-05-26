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
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
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

    // useEffect(() => {
    //     products.map((product, index) => {
    //         if (now.getTime() >= minusMinutes(new Date(product.timeEnd), Number(product.minutes)) && now.getTime() <= new Date(product.timeEnd).getTime()) {
    //             handleCountTimeLeft(String(new Date(product.timeEnd)))
    //         }
    //     })
    // }, [])

    const minusMinutes = (date, minutes) => {
        return new Date(date.getTime() + 1 * 1000 - minutes * 60000);
    }

    // setInterval(() => {
    //     products.map((product, index) => {
    //         if (now.getHours() === new Date(product.timeEnd).getHours() &&
    //             now.getMinutes() === new Date(product.timeEnd).getMinutes() &&
    //             now.getSeconds() === new Date(product.timeEnd).getHours()) {
    //             // checkTimeLeft(String(new Date(product.timeEnd)));
    //             console.log(1);
    //         }
    //         // else{
    //         //     return;
    //         // }
    //     })

    // }, 1000)

    // useEffect(() => {
    // }, [products]);

    const handleCountTimeLeft = (time) => {
        const countDown = new Date(time).getTime();
        const interval = setInterval(() => {
            var now = new Date().getTime();
            var timeLeft = countDown - now;

            if (timeLeft <= 1000) {
                window.alert(123);
            }

            if (timeLeft <= 0) {
                clearInterval(interval)
            }
        }, 1000)
    }

    const checkTimeLeft = (time) => {
        const countDown = new Date(time).getTime();
        var now = new Date().getTime();
        console.log("kết thúc")
        if (countDown <= now) {
            return true;
        }
        else
            return false
    }

    //             //     if (timeCount == 0) {
    //             //         if (product.last_bidder != undefined) {
    //             //             alert('Chúc mừng người chiến thắng của sản phẩm ' + product.name + ' là ' + product.last_bidder)
    //             //             socket.on('bidProductResponse', data => {
    //             //                 // setIsBidded(true);
    //             //                 window.location.href = window.location.href
    //             //             })

    //             //             // users
    //             //             // socket.emit("bidProduct", {is_bidded})
    //             //             // const newOwner = product.last_bidder;
    //             //             // socket.emit("setOwner", { owner: newOwner });
    //             //             window.location.href = window.location.href
    //             //             getElementBid.style.display = 'none';
    //             //         }
    //             //         else {
    //             //             alert('Sản phẩm ' + product.name + ' đã kết thúc thời gian đấu giá mà không tìm được người chiến thắng!')
    //             //             window.location.href = window.location.href
    //             //         }
    //             //     }
    //         }
    //     })
    // }, [products])



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

                    <button className='add-product__btn' onClick={(() => window.location.href = "/bidding/add")}>Thêm sản phẩm mới</button>
                </div>
            </div>
            <Copyright />
        </React.Fragment>
    )
}

export default BiddingPage
