// src/App.jsx
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import Login from './Pages/Login.jsx';
import Admin from './Pages/Admin.jsx';
import './App.css';
import CreateUser from './Pages/CreateUser.jsx';
import UpdateUser from './Pages/UpdateUser.jsx';
import Products from './Pages/Products.jsx';
import CreateProduct from './Pages/CreateProduct.jsx';
import UpdateProduct from './Pages/UpdateProduct.jsx';
import ProductCard from './Components/ProductCard.jsx';
import Cart from './Pages/Cart.jsx';
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
                    <Route path='/ProductCard' element={<ProductCard/>}/>
                    <Route
                        path="/Products"
                        element={
                            <ProtectedRoute requiredUserType={2} requiredPermission={2}>
                                <Products />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/Cart"
                        element={
                            <ProtectedRoute requiredUserType={2} requiredPermission={2}>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
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
                        path="/UpdateProduct/:id"
                        element={
                            <ProtectedRoute requiredUserType={1} requiredPermission={1}>
                                <UpdateProduct />
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
                    <Route path="/UpdateUser" element={<UpdateUser />} />
                    <Route path="/Sales" element={<Sales />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;

