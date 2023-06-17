import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import "./styles/nav.css"

const NavMobile = () => {
    const [isActive, setIsActive] = useState(false)

    const arrayOptions = [
        {
            path: "/home",
            icon: "ti-home",
            name: "Trang chủ"
        },
        {
            path: "/list",
            icon: "ti-list",
            name: "Danh sách"
        }
        , {
            path: "/bidding",
            icon: "ti-shopping-cart",
            name: "Đấu giá"
        }, {
            path: "/fund",
            icon: "ti-credit-card",
            name: "Nạp tiền"
        }
    ]

    const navigate = useNavigate()

    useEffect(() => {
        arrayOptions.map((option, index) => {
            if (option.path === window.location.pathname) {
                document.querySelectorAll(".nav-mobile__btn")[index].classList.add("nav-mobile__btn--active")
            }
        })
    }, [window.location.pathname])

    const handleLogOut = (e) => {
        e.preventDefault();
        if (window.confirm("Bạn muốn đăng xuất tài khoản này!") == true) {
            navigate("/")
        }
        window.localStorage.removeItem("usernameLogged")
    }

    return (
        <div className="nav-mobile">
            {arrayOptions.map((option, index) => (
                <li key={index} className="nav-mobile__btn" onClick={() => { navigate(`${option.path}`); }}>
                    <i className={"nav-mobile__btn-icon " + option.icon}></i>
                    <p className="nav-mobile__btn-name">{option.name}</p>
                </li>
            ))}

            <li className="nav-mobile__btn" onClick={handleLogOut}>
                <i className="nav-mobile__btn-icon ti-arrow-right"></i>
                <p className="nav-mobile__btn-name">Đăng xuất</p>
            </li>
        </div>
    )
}

export default memo(NavMobile);