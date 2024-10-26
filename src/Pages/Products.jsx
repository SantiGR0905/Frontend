import {useState, useEffect} from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [inventories, setInventory] = useState([]);
    const [newProduct, setNewProduct] = useState({
        productName: "",
        description: "",
        creationDate: "",
        active: 1,
        model3D: "",
        categoryId: 1,
    });

    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        fetchInventories();
    });

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                "http://retailspace.somee.com/api/products"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };
    const fetchInventories = async () => {
        try {
            const response = await fetch(
                "http://retailspace.somee.com/api/inventories"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch inventories");
            }
            const data = await response.json();
            setInventory(data);
        } catch (error) {
            console.error("Error fetching inventories", error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewProduct({...newProduct, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://retailspace.somee.com/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newProduct),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to create product");
            }
            fetchProducts(); // Refetch products after adding a new one
            setNewProduct({
                productName: "",
                description: "",
                creationDate: "",
                active: 1,
                model3D: "",
                categoryId: 1,
            });
        } catch (error) {
            console.error("Error creating product", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `http://retailspace.somee.com/api/products/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete product");
            }
            fetchProducts(); // Refetch products after deleting one
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    return (
        <div>
            <h1>Product Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={newProduct.productName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="date"
                    name="creationDate"
                    value={newProduct.creationDate}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="active"
                    placeholder="Active (1/0)"
                    value={newProduct.active}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="model3D"
                    placeholder="Model 3D URL"
                    value={newProduct.model3D}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="categoryId"
                    placeholder="Category ID"
                    value={newProduct.categoryId}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Product</button>
            </form>

            <h2>Products List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.productId}>
                        {product.productName} - {product.description}
                        <button onClick={() => handleDelete(product.productId)}>
                            Delete
                        </button>
                    </li>
                ))}
                {inventories.map((inventory) => (
                    <li key={inventory.inventoryId}>{inventory.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
