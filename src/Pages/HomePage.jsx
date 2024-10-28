// src/pages/HomePage.jsx
import React, { useState } from 'react';
import CategoryList from '../Components/CategoryList.jsx';
import ProductList from '../Components/ProductList.jsx';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const Login = () => {
        navigate('/login');
    }

    return (
        <div className="home-page">
            <h1>Bienvenido a Retail</h1>
            <div className="home-content">
                <CategoryList onCategorySelect={setSelectedCategory} />
                <ProductList selectedCategory={selectedCategory} />
            </div>
            <div>
                <button onClick={Login}>Log In</button>
            </div>
        </div>
    );
}

export default HomePage;
