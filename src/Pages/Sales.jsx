import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/CreateUser.css";

const Sales = () => {
    const [formData, setFormData] = useState({
        stateSale: "",
        direction: "",
        userId: "",
        productId: "",
    });

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    // Obtener usuarios y productos desde el backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://retailspace.somee.com/api/Users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://retailspace.somee.com/api/Products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchUsers();
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Concatenar country, state y address en el campo direction
        try {
            await axios.post("https://retailspace.somee.com/api/Sales", {
                stateSale: 1,
                direction: `${formData.country}, ${formData.state}, ${formData.town},${formData.address}`,
                userId: formData.userId,
                productId: formData.productId,
            });
            alert("Venta creada exitosamente.");
        } catch (error) {
            console.error("Error creando la venta:", error);
            alert("Fallo en la creación de la venta.");
        }
    };

    return (
        <body className="User">
        <div className="UserContainer">
            <h2>Crear Venta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>País:</label>
                    <input
                        placeholder="País"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Departamento:</label>
                    <input
                        placeholder="Departamento"
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Municipio:</label>
                    <input
                        placeholder="Municipio"
                        type="text"
                        name="town"
                        value={formData.town}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input
                        placeholder="Dirección"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Usuario:</label>
                    <select
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar Usuario</option>
                        {users.map((user) => (
                            <option key={user.userId} value={user.userId}>
                                {user.email}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Producto:</label>
                    <select
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar Producto</option>
                        {products.map((product) => (
                            <option key={product.productId} value={product.productId}>
                                {product.productName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Crear Venta</button>
            </form>
        </div>    
        </body>
    );
};

export default Sales;
