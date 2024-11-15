import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/CreateUser.css";
import { useParams } from "react-router-dom"; // Para obtener el ID del producto de la URL

const UpdateProduct = () => {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(`https://retailspace.somee.com/api/Products/${id}`);
                setFormData({
                    productName: productResponse.data.productName,
                    description: productResponse.data.description,
                    active: productResponse.data.active,
                    price: productResponse.data.price,
                    stock: productResponse.data.stock,
                    categoryId: productResponse.data.categoryId,
                });

                const categoriesResponse = await axios.get("https://retailspace.somee.com/api/Categories");
                setCategories(categoriesResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product or categories:", error);
                alert("Error al cargar los datos del producto. Inténtalo más tarde.");
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("productName", formData.productName);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("active", formData.active);
            data.append("stock", formData.stock);
            data.append("categoryId", formData.categoryId);
            if (imageFile) {
                data.append("imageFile", imageFile);
            }

            await axios.put(`https://retailspace.somee.com/api/Products/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Producto actualizado exitosamente.");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Fallo en la actualización del producto.");
        }
    };

    if (loading) {
        return <div>Cargando datos del producto...</div>;
    }

    return (
        <div className="User">
            <div className="UserContainer">
                <h2>Actualizar Producto</h2>
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
                    <button type="submit">Actualizar Producto</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
