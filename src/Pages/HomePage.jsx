// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
    const [products, setProducts] = useState([]);  // Estado para almacenar los productos

    // Esta función obtiene los productos desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://retailspace.somee.com/api/Products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };
        fetchProducts();
    }, []);

    const baseURL = 'https://www.RetailSpace.somee.com';
    //console.log(baseURL);
    //console.log(URL);
    //console.log(baseURL + URL);
    return (
        <div className='body'>
            <header>
                <div className='Titulo'>
                    <a href="/">
                        <img src='img/titulo.png' alt="" />
                    </a>
                </div>
                <div className='barra_derecha'>
                    <Link to="/login">Log In</Link>
                </div>
            </header>
            <main>
                <div className='postheader'>
                    <p>Plataforma de visualización para la compra de muebles en línea que brinda una experiencia inmersiva en 3D donde permite a los usuarios personalizar y visualizar muebles en sus propios espacios mediante realidad aumentada y entornos virtuales, buscando facilitar la elección de colores, materiales y disposición de los muebles de forma realista reduciendo así la incertidumbre y errores en las decisiones de compra.</p>
                    <img src='img/homepage.webp' alt="" />
                </div>
                <h1>Products</h1>
                <div className='products'>
                    {products.map((product) => {
                        const imageURL = baseURL + product.image;
                        return (
                            <div key={product.productId} className='icono'>
                                <img src={imageURL} />
                                <div className='contenido-icono'>
                                    <h3>{product.productName}</h3>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default HomePage;
