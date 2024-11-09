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
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (!confirmDelete) {
            return;
        }
    
        try {
            await axios.delete(`https://retailspace.somee.com/api/Products/${id}`);
            setProducts(products.filter(product => product.productId !== id));
            alert('Producto eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
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
                                <td className='Botones'>
                                    <Link to={`/UpdateProduct/${product.productId}`} className='btn update-btn'>Update</Link>
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
