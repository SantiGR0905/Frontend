// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://retailspace.somee.com/api', // Reemplaza con la URL de tu backend
});

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories', error);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

export const createSale = async (saleData) => {
    try {
        const response = await api.post('/sales', saleData);
        return response.data;
    } catch (error) {
        console.error('Error creating sale', error);
        throw error;
    }
};

export default api;
