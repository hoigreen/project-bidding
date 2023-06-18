import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import socketIO from 'socket.io-client';

import Login from './components/Account/Login';
import Register from './components/Account/Register';
import HomePage from './components/HomePage/HomePage';
import AddProduct from './components/Bidding/AddProduct';
import BidProduct from './components/Bidding/BidProduct';
import BiddingPage from './components/Bidding/BiddingPage';
import ListProduct from './components/ListPage/ListPage';
import ContactPage from './components/Contact/ContactPage';
import FundPage from './components/Funding/FundPage';

// const socket = socketIO.connect('http://localhost:4000');
const socket = socketIO.connect('https://bidding-server.onrender.com');

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login socket={socket} />} />
                <Route path="/register" element={<Register socket={socket} />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/list" element={<ListProduct socket={socket} />} />

                <Route path="/bidding" element={<BiddingPage socket={socket} />} />
                <Route path="/bidding/add" element={<AddProduct socket={socket} />} />
                <Route path="/bidding/bid/:name/:price" element={<BidProduct socket={socket} />} />

                <Route path="/fund" element={<FundPage socket={socket} />} />

                <Route path="/contact" element={<ContactPage socket={socket} />} />
            </Routes>
        </Router>
    );
}

export default App;