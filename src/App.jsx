// src/App.jsx
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import Login from './Pages/Login.jsx';
import Admin from './Pages/Admin.jsx';
import './App.css';
import CreateUser from './Pages/CreateUser.jsx';
import CreateProduct from './Pages/CreateProduct.jsx';
import Sales from './Pages/Sales.jsx';
import Users from './Pages/Users.jsx';
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { AuthProvider } from './Services/AuthContext.jsx';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/Admin"
                        element={
                            <ProtectedRoute requiredUserType={1} requiredPermission={1}>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/CreateProduct"
                        element={
                            <ProtectedRoute requiredUserType={1} requiredPermission={1}>
                                <CreateProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/Users"
                        element={
                            <ProtectedRoute requiredUserType={1} requiredPermission={1}>
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/CreateUser" element={<CreateUser />} />
                    <Route path="/Sales" element={<Sales />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;

