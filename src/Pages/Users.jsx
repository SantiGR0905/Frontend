import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import '../assets/Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://retailspace.somee.com/api/Users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } 
        };
        fetchUsers();
    }, []);

    const userDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (!confirmDelete) {
            return;
        }
        try {
            await axios.delete(`https://retailspace.somee.com/api/Users/${id}`);
            setUsers(users.filter(user => user.userId !== id));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
    const userUpdate = (user) => {
        console.log('Update: ', user)
    }

    return (
        <div className='users-container'>
            <h2>Usuarios</h2>
            <div className='Register-User'>
                <Link to="/CreateUser">Registrar Usuario</Link>
            </div>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Fecha Registro</th>
                        <th>Tipo de Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.date).toLocaleDateString()}</td>
                            <td>{user.userTypes.userType}</td>
                            <td>
                                <button className='btn delete' onClick={() => userDelete(user.userId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users;