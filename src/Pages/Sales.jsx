import React, {useState, useEffect} from "react";

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [newSale, setNewSale] = useState({
        saleDate: "",
        stateSale: 1,
        direction: "",
        userId: 0,
        productId: 0,
    });
    const [editingSale, setEditingSale] = useState(null);

    useEffect(() => {
        fetchSales();
    }, []);

    // Fetch all sales from the API
    const fetchSales = async () => {
        try {
            const response = await fetch(
                "http://retailspace.somee.com/api/sales"
            );
            if (!response.ok) throw new Error("Failed to fetch sales");

            const data = await response.json();
            setSales(data);
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewSale({...newSale, [name]: value});
    };

    // Handle creating a new sale
    const handleCreateSale = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://retailspace.somee.com/api/sales",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newSale),
                }
            );
            if (!response.ok) throw new Error("Failed to create sale");

            fetchSales(); // Refresh sales list after creating a new sale
            setNewSale({
                saleDate: "",
                stateSale: 1,
                direction: "",
                userId: 0,
                productId: 0,
            });
        } catch (error) {
            console.error("Error creating sale:", error);
        }
    };

    // Handle updating an existing sale
    const handleUpdateSale = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://retailspace.somee.com/api/sales/${editingSale.saleId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newSale),
                }
            );
            if (!response.ok) throw new Error("Failed to update sale");

            fetchSales(); // Refresh sales list after updating
            setEditingSale(null);
            setNewSale({
                saleDate: "",
                stateSale: 1,
                direction: "",
                userId: 0,
                productId: 0,
            });
        } catch (error) {
            console.error("Error updating sale:", error);
        }
    };

    // Handle deleting a sale
    const handleDeleteSale = async (id) => {
        try {
            const response = await fetch(
                `http://retailspace.somee.com/api/sales/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) throw new Error("Failed to delete sale");

            fetchSales(); // Refresh sales list after deleting
        } catch (error) {
            console.error("Error deleting sale:", error);
        }
    };

    return (
        <div>
            <h1>Sales Management</h1>
            <form onSubmit={editingSale ? handleUpdateSale : handleCreateSale}>
                <input
                    type="date"
                    name="saleDate"
                    value={newSale.saleDate}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="stateSale"
                    placeholder="State Sale"
                    value={newSale.stateSale}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="direction"
                    placeholder="Direction"
                    value={newSale.direction}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="userId"
                    placeholder="User ID"
                    value={newSale.userId}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="productId"
                    placeholder="Product ID"
                    value={newSale.productId}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">
                    {editingSale ? "Update Sale" : "Add Sale"}
                </button>
            </form>

            <h2>Sales List</h2>
            <ul>
                {sales.map((sale) => (
                    <li key={sale.saleId}>
                        <p>Date: {sale.saleDate}</p>
                        <p>State: {sale.stateSale}</p>
                        <p>Direction: {sale.direction}</p>
                        <p>User ID: {sale.userId}</p>
                        <p>Product ID: {sale.productId}</p>
                        <button onClick={() => setEditingSale(sale)}>
                            Edit
                        </button>
                        <button onClick={() => handleDeleteSale(sale.saleId)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sales;
