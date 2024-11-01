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
                    <Link to="/createProduct">Producto</Link>
                    <Link to="/Sales">Ventas</Link>
                </div>
            </header>
            <main>
                <div className='postheader'>
                    <p>Plataforma de visualización para la compra de muebles en línea que brinda una experiencia inmersiva en 3D donde permite a los usuarios personalizar y visualizar muebles en sus propios espacios mediante realidad aumentada y entornos virtuales, buscando facilitar la elección de colores, materiales y disposición de los muebles de forma realista reduciendo así la incertidumbre y errores en las decisiones de compra.</p>
                    <img src="src/img/homepage.webp" alt="" />
                </div>
                <h1>Products</h1>
                <div className='products'>
                    <div className='icono'>
                        <img src="src/img/mueblebaño.png" alt="" />
                        <div className='contenido-icono'>
                        <h3>Mueble baño</h3>
                        <p>Mueble De Baño Amaretto Miel 46x 61.5 x 47 cm con Lavamanos Blanco</p>
                        </div>
                    </div>
                    <div className='icono'>
                        <img src="src/img/mueblebaño.png" alt="" />
                        <div className='contenido-icono'>
                        <h3>Mueble baño</h3>
                        <p>Mueble De Baño Amaretto Miel 46x 61.5 x 47 cm con Lavamanos Blanco</p>
                        </div>
                    </div>
                    <div className='icono'>
                        <img src="src/img/mueblebaño.png" alt="" />
                        <div className='contenido-icono'>
                        <h3>Mueble baño</h3>
                        <p>Mueble De Baño Amaretto Miel 46x 61.5 x 47 cm con Lavamanos Blanco</p>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
}

export default HomePage;
