import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import Nav from '../nav/Nav';
import Copyright from '../common/Copyright';
import NavMobile from '../nav/NavMobile';

const MainPage = ({ socket }) => {
    return (
        <div>
            <Nav socket={socket} />
            <NavMobile />
            <div className="home__container">
                <Link to="/list" className="home__items home__sidebar-one">
                    <div>
                        <label className="home__items-label">Danh sách sản phẩm</label>
                        <p className="home__items-description">Xem những sản phẩm tốt nhất dành cho bạn</p>
                    </div>
                </Link>

                <div className="home__content">
                    <Link to="/bidding" className="home__items home__sidebar-two">
                        <label className="home__items-label">Đấu giá</label>
                        <p className="home__items-description">Đưa ra giá mà bạn muốn có nó</p>
                    </Link>


                    <div className="home__sidebar-three">
                        <Link to="/fund" className="home__items home__fund">
                            <label className="home__items-label">Nạp tiền</label>
                            <p className="home__items-description">Hãy lấp đầy ngân sách và chào mua những thứ mà bạn muốn</p>
                        </Link>

                        <Link to="/contact" className="home__items home__contact">
                            <label className="home__items-label">Liên hệ</label>
                            <p className="home__items-description">Liên hệ với chúng tôi khi bạn thấy muốn được giúp đỡ</p>
                        </Link>
                    </div>
                </div>
            </div>
            <Copyright />
        </div>
    );
}

export default MainPage;