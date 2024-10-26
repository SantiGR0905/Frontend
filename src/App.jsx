import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from "./Pages/Login"; // Asegúrate de que la ruta sea correcta
import CreateUser from "./Pages/CreateUser";
import Products from "./Pages/Products";
import Sales from "./Pages/Sales";

function App() {
    return (
        <Router>
            <div>
                <h1>Welcome to ImmersiRoom</h1>
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/create-user">Register</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/sales">Sales</Link>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/sales" element={<Sales />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
