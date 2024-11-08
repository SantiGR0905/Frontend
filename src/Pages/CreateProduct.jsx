import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/CreateUser.css";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        active: true,
        price: "",
        stock: "",
        categoryId: "",
    });

    const [imageFile, setImageFile] = useState(null); 
    const [categories, setCategories] = useState([]);

    // Obtener categorías desde el backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://retailspace.somee.com/api/Categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();  
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file); // Almacena el archivo seleccionado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData(); // FormData para enviar archivos
            data.append("productName", formData.productName);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("active", formData.active);
            data.append("stock", formData.stock);
            data.append("categoryId", formData.categoryId);
            if (imageFile) {
                data.append("imageFile", imageFile); // Agrega la imagen si existe
            }

            const response = await axios.post("https://retailspace.somee.com/api/Products", data, {
                headers: {
                    "Content-Type": "multipart/form-data", // No es necesario si no estás configurando el header manualmente
                }
            });
            alert("Producto creado exitosamente.");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Fallo en la creación del producto.");
        }
    };

    return (
        <div className="User">
            <div className="UserContainer">
                <h2>Crear Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre del producto</label>
                        <input
                            placeholder="Nombre del producto"
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Descripción</label>
                        <input
                            placeholder="Descripción"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Precio</label>
                        <input
                            placeholder="Precio"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Imagen del producto</label>
                        <input
                            type="file"
                            name="imageFile"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Unidades</label>
                        <input
                            placeholder="Unidades"
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Categoría</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar Categoría</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Crear Producto</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
