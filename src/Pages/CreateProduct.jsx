import React, {useState, useEffect} from "react";
import axios from "axios";
import "../assets/CreateUser.css";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        active: "",
        model3D: "",
        categoryId: "",
    });

    const [categories, setCategories] = useState([]);

    // Obtener categorías desde el backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://retailspace.somee.com/api/Categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://retailspace.somee.com/api/Products",
                {
                    productName: formData.productName,
                    description: formData.description,
                    active: 1,
                    model3D: formData.model3D,
                    categoryId: formData.categoryId,
                }
            );
            alert("Producto creado exitosamente.");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Fallo en la creación del producto.");
        }
    };

    return (
        <body className="User">
            <div className="UserContainer">
                <h2>Crear Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label></label>
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
                    <label></label>
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
                    <label></label>
                    <input
                        placeholder="Imagen del producto"
                        type="text"
                        name="model3D"
                        value={formData.model3D}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
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
        </body>
    );
};

export default CreateProduct;
