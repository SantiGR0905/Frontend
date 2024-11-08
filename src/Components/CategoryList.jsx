// src/components/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import { getCategories } from '../Services/api.js';

function CategoryList({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <div className="category-list">
            <h3>Categorías  </h3>
            <ul>
                {categories.map(category => (
                    <li key={category.categoryId} onClick={() => onCategorySelect(category.categoryId)}>
                        {category.categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
