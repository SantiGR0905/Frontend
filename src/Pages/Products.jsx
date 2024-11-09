import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/ProductPage.css';
import ProductCard from '../Components/ProductCard.jsx';
import Cart from './Cart.jsx';
import { useAuth } from '../Services/AuthContext.jsx'; 

const Products = () => {
    const { userId, logout} = useAuth(); 
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
            fetchOrCreateCart(userId); // Solo se ejecuta si el userId está disponible
        }
        
        fetchProducts();
    }, [userId]);

    // Función para buscar o crear un carrito activo
    const fetchOrCreateCart = async (userId) => {
        try {
            const response = await axios.get('https://retailspace.somee.com/api/Carts');
            //console.log(response);
            //console.log(response.data.find(cart.isActive));
            //console.log(response.data.find(cart.users.userId === userId));
            const activeCart = response.data.find(cart => cart.isActive || cart.users.userId === userId);
            console.log(activeCart.cartId);

            if (activeCart) {
                setCartId(activeCart.cartId); // Establece el cartId existente
                return activeCart.cartId;     // Devuelve el cartId existente
            } else {
                // Crear un nuevo carrito
                const newCartResponse = await axios.post('https://retailspace.somee.com/api/Carts', {
                    userId: userId,
                    isActive: true
                });
    
                console.log("Respuesta al crear el carrito:", newCartResponse.data);
    
                // Si no devuelve el cartId, volvemos a buscarlo en la lista de carritos
                const updatedResponse = await axios.get('https://retailspace.somee.com/api/Carts');
                const newlyCreatedCart = updatedResponse.data.find(cart => cart.isActive && cart.users.userId === userId);
    
                if (newlyCreatedCart) {
                    setCartId(newlyCreatedCart.idcart); // Establece el cartId recién creado
                    console.log(newlyCreatedCart.idcart);
                    return newlyCreatedCart.idcart;     // Devuelve el cartId recién creado
                } else {
                    console.error('No se pudo obtener el nuevo cartId.');
                    return null;
                }
            }
        } catch (error) {
            console.error('Error al obtener o crear el carrito:', error);
            return null;
        } finally {
            setLoadingCart(false); // Se deja de cargar una vez que se completa la operación
        }
    };
    
    const handleAddToCart = async (product) => {
        if (loadingCart) {
            alert('Por favor, espere mientras se carga o crea su carrito...');
            return;
        }
        console.log('Product:', product.productId);
        console.log('User ID:', userId); // Verifica el userId
        let currentCartId = cartId;
    
        if (!currentCartId) {
            console.log('Cart ID no disponible, creando un carrito...');
            currentCartId = await fetchOrCreateCart(userId); // Espera a que el cartId sea asignado
        }
    
        if (!currentCartId) {
            alert('No se pudo crear o encontrar un carrito. Inténtalo nuevamente.');
            return;
        }
    
        console.log('Cart ID después de verificar:', currentCartId);
        console.log('Product ID:', product);
    
        try {
            await axios.post('https://retailspace.somee.com/api/CartItems', {
                quantity: 1,
                cartId: currentCartId,  // Usa el cartId que acabamos de obtener o crear
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
                        <img src='img/titulo.png' alt="" />
                    </a>
                </div>
                <div className='barra_derecha'>
                <button 
                        onClick={() => {
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
