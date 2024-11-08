import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../assets/Admin.css'; 

const Admin = () => {
    const [products, setProducts] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://retailspace.somee.com/api/Products/${id}`);
            setProducts(products.filter(product => product.productId !== id));
            alert('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdate = (product) => {
        console.log('Update product:', product);
    };
    

    return (
        <div className="admin-container">
            <h2>Admin</h2>
                <div className='Register-Product'>
                    <Link to="/CreateProduct">Crear</Link>
                    <Link to="/Users">Usuarios</Link>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Nombre Producto</th>
                            <th>Descripción</th>
                            <th>Img</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Unidades</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>{product.image}</td>
                                <td>{product.categories ? product.categories.categoryName : "No disponible"}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button className="btn update-btn" onClick={() => handleUpdate(product)}>Update</button>
                                    <button className="btn delete-btn" onClick={() => handleDelete(product.productId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
};

export default Admin;
