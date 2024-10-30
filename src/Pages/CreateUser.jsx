import React, {useState} from "react";
import axios from "axios";
import "../assets/CreateUser.css";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userTypeId: "",
    });

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
                "https://retailspace.somee.com/api/Users",
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    userTypeId: 2,
                }
            );
            alert("User created successfully.");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user.");
        }
    };

    return (
        <body className="User">
            <div className="UserContainer">
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label></label>
                        <input
                            placeholder="Nombre"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                </div>
                <div>
                    <label></label>
                    <input
                        placeholder="Apellido"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label></label>
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label></label>
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
        </body>
    );
};

export default CreateUser;
