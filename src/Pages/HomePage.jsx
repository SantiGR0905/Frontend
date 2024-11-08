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
                        <img src='public/img/titulo.png' alt="" />
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
                    <img src='public/img/homepage.webp' alt="" />
                </div>
                <h1>Products</h1>
                <div className='products'>
                    {/* Mapea los productos y muestra la información */}
                    {products.map((product) => {
                        // Concatenar baseURL con product.image
                        console.log(product.image);
                        const imageURL = baseURL + product.image;
                        // Imprimir en consola la URL completa
                        console.log("URL de la imagen del producto:", imageURL);
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
