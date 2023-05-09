import React from 'react'

const NavMobile = () => {
    return (
        <div className="nav-mobile">
            <li className="nav-mobile__btn nav-mobile__btn--active" onClick={() => { window.location.href = "/home"; }}>
                <i className="nav-mobile__btn-icon ti-home"></i>
                <p className="nav-mobile__btn-name">Trang chủ</p>
            </li>
            <li className="nav-mobile__btn" onClick={() => { window.location.href = "/list"; }}>
                <i className="nav-mobile__btn-icon ti-list"></i>
                <p className="nav-mobile__btn-name">Danh sách</p>
            </li>
            <li className="nav-mobile__btn" onClick={() => { window.location.href = "/bidding"; }}>
                <i className="nav-mobile__btn-icon ti-shopping-cart"></i>
                <p className="nav-mobile__btn-name">Đấu giá</p>
            </li>
            <li className="nav-mobile__btn" onClick={() => { window.location.href = "/fund"; }}>
                <i className="nav-mobile__btn-icon ti-credit-card"></i>
                <p className="nav-mobile__btn-name">Nạp tiền</p>
            </li>
            <li className="nav-mobile__btn" onClick={() => { window.location.href = "/"; }}>
                <i className="nav-mobile__btn-icon ti-arrow-right"></i>
                <p className="nav-mobile__btn-name">Đăng xuất</p>
            </li>
        </div>
    )
}

export default NavMobile;