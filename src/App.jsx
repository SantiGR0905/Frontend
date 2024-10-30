// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import Login from './Pages/Login.jsx';
import './App.css';
import CreateUser from './Pages/CreateUser.jsx';
import CreateProduct from './Pages/CreateProduct.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/CreateUser" element={<CreateUser />} />
                    <Route path="/CreateProduct" element={<CreateProduct />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

