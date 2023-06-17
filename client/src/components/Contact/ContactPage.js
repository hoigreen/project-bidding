import React, { useState } from 'react';

import "./styles/contact.css"

import Nav from '../Common/Nav';
import Copyright from '../Common/Copyright';
import NavMobile from '../Common/NavMobile';

const ContactPage = () => {
    return (
        <div>
            <Nav />
            <NavMobile />
            <div className='contact'>
                <div className='contact__container'>
                    <label className='contact__item contact__title'>Thông tin liên hệ</label>
                    <label className='contact__item contact__description'>Bất kì câu hỏi hoặc nhận xét nào! Hãy liên hệ với Nhóm 3 chúng tôi qua những cách dưới đây.
                    Sự hài lòng của bạn là vinh dự cho chúng tôi</label>
                    <div className='contact__item contact__phone'>
                        <i className='contact__icon ti-mobile'></i>    
                        (+84) 28 123456789
                    </div>
                    <div className='contact__item contact__email'>
                    <i className='contact__icon ti-email'></i>
                        nhom3_ltm@gmail.com</div>
                    <div className='contact__item contact__address'>
                    <i className='contact__icon ti-location-pin'></i>
                    70 Tô Ký, P.Tân Chánh Hiệp, Q.12, TPHCM</div>
                    <div className='contact__item contact__social'>
                        <i className='contact__social-icon ti-facebook'></i>
                        <i className='contact__social-icon ti-instagram'></i>
                        <i className='contact__social-icon ti-twitter-alt'></i>
                        <i className='contact__social-icon ti-dropbox'></i>
                        <i className='contact__social-icon ti-sharethis'></i>
                    </div>
                </div>

            </div>
           <Copyright />
        </div>
    );
}

export default ContactPage;