import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/CartPage.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart items on mount
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

    // Remove an item from the cart
    const handleRemoveFromCart = async (cartItemId) => {
        try {
            await axios.delete(`https://retailspace.somee.com/api/CartItems/${cartItemId}`);
            setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    };

    // Update the quantity of an item
    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1
        try {
            console.log(`Updating cart item: ${cartItemId} with new quantity: ${newQuantity}`);
            const response = await axios.put(`https://retailspace.somee.com/api/CartItems/${cartItemId}`, { quantity: newQuantity });
            console.log(response.data);
            setCartItems(cartItems.map(item =>
                item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
            ));
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto:', error);
        }
    };
    

    return (
        <div>
            <h1>Carrito</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.cartItemId} className="cart-item">
                        <p><strong>Producto:</strong> {item.products.productName}</p>
                        <p><strong>Cantidad:</strong> {item.quantity}</p>
                        <button onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                        <button onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                        <button onClick={() => handleRemoveFromCart(item.cartItemId)}>Eliminar</button>
                    </div>
                ))
            ) : (
                <p>El carrito está vacío.</p>
            )}
        </div>
    );
};

export default Cart;
