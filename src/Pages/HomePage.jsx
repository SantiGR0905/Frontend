// src/pages/HomePage.jsx
import React, { useState } from 'react';
import CategoryList from '../Components/CategoryList.jsx';
import ProductList from '../Components/ProductList.jsx';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    

    return (
        <body>
            <header>
                <div className='Titulo'>
                    <a href="/">
                        <h1>ImmersiRoom</h1>
                    </a>
                </div>
                <div>
                    <a href="/Categorias">Categorias</a>
                    <a href="">Cocina</a>
                    <a href="">Baño</a>
                    <a href="/login.jsx">Log In</a>
                </div>
            </header>
            <main>
                
            </main>
        </body>
    );
}

export default HomePage;
