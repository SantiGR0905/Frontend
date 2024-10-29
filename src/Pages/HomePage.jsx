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
                        <img src="src/img/titulo.png" alt="" />
                    </a>
                </div>
                <div className='barra_derecha'>
                    <a href="/Categorias">Categorias</a>
                    <a href="">Cocina</a>
                    <a href="">Baño</a>
                    <Link to="/login">Log In</Link>
                </div>
            </header>
            <main>
                <h1>Products</h1>
                <div className='products'>
                    <div className='icono'>
                        <img src="src/img/mueblebaño.png" alt="" />
                        <h3>Mueble baño</h3>
                        <p>Mueble De Baño Amaretto Miel 46x 61.5 x 47 cm con Lavamanos Blanco</p>
                    </div>
                    <div className='icono'>
                        <img src="src/img/mueblebaño.png" alt="" />
                        <h3>Mueble baño</h3>
                        <p>Mueble De Baño Amaretto Miel 46x 61.5 x 47 cm con Lavamanos Blanco</p>
                    </div>
                    <div className='icono'>
                        <img src="src/img/mueblebaño.png" alt="" />
                        <h3>Mueble baño</h3>
                        <p>Mueble De Baño Amaretto Miel 46x 61.5 x 47 cm con Lavamanos Blanco</p>
                    </div>
                </div>
            </main>
        </body>
    );
}

export default HomePage;
