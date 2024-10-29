// src/pages/HomePage.jsx
import React, { useState } from 'react';
import CategoryList from '../Components/CategoryList.jsx';
import ProductList from '../Components/ProductList.jsx';
import { Link } from 'react-router-dom';

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    

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
                    <Link to="/login">Log In</Link>
                </div>
            </header>
            <main>
                
            </main>
        </body>
    );
}

export default HomePage;
