// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../Services/api.js';
import ProductCard from './ProductCard.jsx';

function ProductList({ selectedCategory }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            if (selectedCategory) {
                setProducts(data.filter(p => p.categoryId === selectedCategory));
            } else {
                setProducts(data);
            }
        };
        fetchProducts();
    }, [selectedCategory]);

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.productId} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
