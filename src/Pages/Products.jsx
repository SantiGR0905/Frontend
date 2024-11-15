import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/ProductPage.css';
import ProductCard from '../Components/ProductCard.jsx';
import Cart from './Cart.jsx';
import { useAuth } from '../Services/AuthContext.jsx'; 

const Products = () => {
    const { userId, logout } = useAuth(); 
    const [products, setProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [cartId, setCartId] = useState(null);
    const [loadingCart, setLoadingCart] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://retailspace.somee.com/api/Products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        if (userId) {
            fetchOrCreateCart(userId);
        }

        fetchProducts();
    }, [userId]);

    const fetchOrCreateCart = async (userId) => {
        try {
            const response = await axios.get('https://retailspace.somee.com/api/Carts');
            const activeCart = response.data.find(cart => cart.isActive && cart.users.userId === userId);

            if (activeCart) {
                setCartId(activeCart.cartId);
                return activeCart.cartId;
            } else {
                const newCartResponse = await axios.post('https://retailspace.somee.com/api/Carts', {
                    userId: userId,
                    isActive: true
                });
                const updatedResponse = await axios.get('https://retailspace.somee.com/api/Carts');
                const newlyCreatedCart = updatedResponse.data.find(cart => cart.isActive && cart.users.userId === userId);
                if (newlyCreatedCart) {
                    setCartId(newlyCreatedCart.cartId);
                    return newlyCreatedCart.cartId;
                } else {
                    console.error('No se pudo obtener el nuevo cartId.');
                    return null;
                }
            }
        } catch (error) {
            console.error('Error al obtener o crear el carrito:', error);
            return null;
        } finally {
            setLoadingCart(false);
        }
    };

    const handleAddToCart = async (product) => {
        if (loadingCart) {
            alert('Por favor, espere mientras se carga o crea su carrito...');
            return;
        }

        let currentCartId = cartId;
        if (!currentCartId) {
            currentCartId = await fetchOrCreateCart(userId);
        }

        if (!currentCartId) {
            alert('No se pudo crear o encontrar un carrito. Inténtalo nuevamente.');
            return;
        }

        try {
            await axios.post('https://retailspace.somee.com/api/CartItems', {
                quantity: 1,
                cartId: currentCartId,
                productId: product.productId,
            });
            alert(`Producto ${product.productName} agregado al carrito.`);
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error.response?.data || error.message);
            alert('Hubo un error al agregar el producto al carrito.');
        }
    };

    return (
        <div className='body'>
            <header>
                <div className='Titulo'>
                    <a href="/">
                        <img src='img/titulo.png' alt="Titulo" />
                    </a>
                </div>
                <div className='barra_derecha'>
                    <button onClick={() => {
                        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                            logout(); 
                        }
                    }}>LogOut</button>
                </div>
            </header>
            <div className='product-page'>
                <h1>Productos Disponibles</h1>
                <button onClick={() => setShowCart(!showCart)}>
                    {showCart ? 'Ocultar Carrito' : 'Ver Carrito'}
                </button>
                {showCart && <Cart />}
                <div className='product-list'>
                    {products.length === 0 ? (
                        <p>No hay productos disponibles.</p>
                    ) : (
                        products.map((product) => (
                            <ProductCard
                                key={product.productId}
                                product={product}
                                onAddToCart={handleAddToCart}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;

