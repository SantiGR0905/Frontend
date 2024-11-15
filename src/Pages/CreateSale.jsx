import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import { useAuth } from '../Services/AuthContext.jsx';

function CreateSale() {
    const { userId } = useAuth();
    const [sales, setSales] = useState([]);
    const [form, setForm] = useState({
        stateSale: '',
        direction: '',
        userId: userId || '', 
        paymentMethodId: ''
    });
    const location = useLocation(); 
    const cartItems = location.state?.cartItems || []; 
    const [paymentMethods, setPaymentMethods] = useState([]);
    
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get("https://retailspace.somee.com/api/PaymentMethods");
                setPaymentMethods(response.data);
            } catch (error) {
                console.error("Error fetching payment methods:", error);
            }
        };

        fetchPaymentMethods();  
    }, []);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('https://retailspace.somee.com/api/Sales');
                setSales(response.data);
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };
        fetchSales();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCreateSale = async (e) => {
        e.preventDefault();
        
        if (!userId) {
            alert('Error: No se ha podido identificar al usuario.');
            return;
        }

        try {
          const saleResponse = await axios.post('https://retailspace.somee.com/api/Sales', form);

          const salesResponse = await axios.get('https://retailspace.somee.com/api/Sales');
          const lastSale = salesResponse.data.sort((a, b) => b.saleId - a.saleId)[0];  

        const saleId = lastSale?.saleId;
        if (!saleId) {
            throw new Error('No se pudo obtener el saleId de la última venta');
        }

            const saleDetails = cartItems.map(item => 
                axios.post('https://retailspace.somee.com/api/SalesDetails', {
                    saleId, 
                    productId: item.products.productId,
                    quantity: item.quantity,
                    unitPrice: item.products.price
                })
            );

            await Promise.all(saleDetails);
            alert('Venta creada con éxito');
            
            setForm({
                stateSale: 'Pendiente',
                direction: `${form.country}, ${form.state}, ${form.town},${form.address}`,
                userId: userId,
                paymentMethodId: ''
            });
        } catch (error) {
            console.error('Error al crear la venta:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <div>
                <h2>Formulario de Venta</h2>
                <form onSubmit={handleCreateSale}>
                    <div>
                        <label>País:</label>
                        <input
                            placeholder="País"
                            type="text"
                            name="country"
                            value={form.country}
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
                            value={form.state}
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
                            value={form.town}
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
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Metodo de Pago</label>
                        <select
                            name="paymentMethodId"
                            value={form.paymentMethodId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar Metodo de Pago</option>
                            {paymentMethods.map((paymentMethod) => (
                                <option key={paymentMethod.paymentMethodId} value={paymentMethod.paymentMethodId}>
                                    {paymentMethod.methodName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Crear Venta</button>
                </form>
            </div>
        </div>
    );
}

export default CreateSale;
