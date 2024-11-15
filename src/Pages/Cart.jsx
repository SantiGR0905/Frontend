import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/CartPage.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loadingSale, setLoadingSale] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('https://retailspace.somee.com/api/CartItems');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error al obtener los elementos del carrito:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            await axios.delete(`https://retailspace.somee.com/api/CartItems/${cartItemId}`);
            setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    };

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axios.put(`https://retailspace.somee.com/api/CartItems/${cartItemId}`, { quantity: newQuantity });
            setCartItems(cartItems.map(item =>
                item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
            ));
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto:', error);
        }
    };

    const handleProceedToSale = () => {
        if (cartItems.length === 0) {
            alert('No hay productos en el carrito para crear una venta.');
            return;
        }
        // Navegar al formulario de ventas con los detalles del carrito
        navigate('/CreateSale', { state: { cartItems } });
    };

    return (
        <div>
            <h1>Carrito</h1>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <div key={item.cartItemId} className="cart-item">
                            <p><strong>Producto:</strong> {item.products.productName}</p>
                            <p><strong>Cantidad:</strong> {item.quantity}</p>
                            <button onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                            <button onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                            <button onClick={() => handleRemoveFromCart(item.cartItemId)}>Eliminar</button>
                        </div>
                    ))}
                    <button onClick={handleProceedToSale}>
                        Confirmar Venta
                    </button>
                </>
            ) : (
                <p>El carrito está vacío.</p>
            )}
        </div>
    );
};

export default Cart;
    