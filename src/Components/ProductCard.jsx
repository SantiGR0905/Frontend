import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
        <h3>{product.productName}</h3>
        <img src={'https://www.retailspace.somee.com' + product.image} alt={product.productName} className="product-image" />
        <p>${product.price}</p>
        <p> {product.categories.categoryName}</p>
        <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
        </div>
    );
};

export default ProductCard;
