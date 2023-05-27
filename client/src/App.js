import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import socketIO from 'socket.io-client';

import Login from './components/account/Login';
import Register from './components/account/Register';
import Home from './components/home/Home';
import AddProduct from './components/bidding/AddProduct';
import BidProduct from './components/bidding/BidProduct';
import BiddingPage from './components/bidding/BiddingPage';
import ListProduct from './components/list/ListProduct';
import ContactPage from './components/contact/ContactPage';
import FundPage from './components/fund/FundPage';

const socket = socketIO.connect('https://bidding-server.onrender.com');
// const socket = socketIO.connect('https://bidding-server.onrender.com');

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login socket={socket} />} />
                    <Route path="/register" element={<Register socket={socket} />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/list" element={<ListProduct socket={socket} />} />

                    <Route path="/bidding" element={<BiddingPage socket={socket} />} />
                    <Route path="/bidding/add" element={<AddProduct socket={socket} />} />
                    <Route path="/bidding/bid/:name/:price" element={<BidProduct socket={socket} />} />

                    <Route path="/fund" element={<FundPage socket={socket} />} />

                    <Route path="/contact" element={<ContactPage socket={socket} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;