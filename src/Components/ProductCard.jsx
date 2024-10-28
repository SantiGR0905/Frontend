// src/components/ProductCard.jsx
import React from 'react';
import { createSale } from '../Services/api.js';

function ProductCard({ product }) {
    const handlePurchase = async () => {
        const saleData = {
            saleDate: new Date().toISOString(),
            stateSale: 1, // Estado de venta, ajustar según lógica
            direction: 'Dirección de entrega',
            userId: 1, // ID del usuario, debe ser dinámico
            productId: product.productId,
        };
        await createSale(saleData);
        alert('Producto comprado con éxito');
    };

    return (
        <div className="product-card">
            <h4>{product.productName}</h4>
            <p>{product.productDescription}</p>
            <button onClick={handlePurchase}>Comprar</button>
        </div>
    );
}

export default ProductCard;
