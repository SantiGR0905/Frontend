import React, { useState } from "react";
import axios from "axios";
import "../assets/CreateUser.css";
import { Link } from "react-router-dom";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "", 
        userTypeId: 2,
        acceptPolicy: false,
    });
    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState("");

    // Validación de campos de usuario
    const validateUserFields = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio.";
        else if (formData.firstName.length < 2) newErrors.firstName = "El nombre debe tener al menos 2 caracteres.";

        if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio.";
        else if (formData.lastName.length < 2) newErrors.lastName = "El apellido debe tener al menos 2 caracteres.";

        if (!formData.email.trim()) newErrors.email = "El correo electrónico es obligatorio.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Formato de correo inválido.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validación de la política de contraseña y confirmación de contraseña
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!formData.password) {
            setErrors(prevErrors => ({ ...prevErrors, password: "La contraseña es obligatoria." }));
            return false;
        } else if (!passwordRegex.test(formData.password)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&).",
            }));
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: "Las contraseñas no coinciden.",
            }));
            return false;
        }
        setErrors(prevErrors => ({ ...prevErrors, password: null, confirmPassword: null }));
        return true;
    };

    // Validación de la aceptación de políticas
    const validatePolicy = () => {
        if (!formData.acceptPolicy) {
            setErrors(prevErrors => ({ ...prevErrors, acceptPolicy: "Debes aceptar las políticas de tratamiento de datos." }));
            return false;
        }
        setErrors(prevErrors => ({ ...prevErrors, acceptPolicy: null }));
        return true;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Limpiar error global
        setGlobalError("");

        // Validación de campos, contraseña y políticas
        const isUserValid = validateUserFields();
        const isPasswordValid = validatePassword();
        const isPolicyAccepted = validatePolicy();

        if (!isUserValid || !isPasswordValid || !isPolicyAccepted) return; // Salir si hay errores

        try {
            const response = await axios.post(
                "https://retailspace.somee.com/api/Users",
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    userTypeId: formData.userTypeId,
                }
            );
            alert("Usuario creado exitosamente.");
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            setGlobalError("Fallo al crear el usuario. Por favor, intente nuevamente.");
        }
    };

    return (
        <div className="User">
            <div className="UserContainer">
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            placeholder="Nombre"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div>
                        <input
                            placeholder="Apellido"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                    <div>
                        <input
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <input
                            placeholder="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <input
                            placeholder="Confirmar Contraseña"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="acceptPolicy"
                            checked={formData.acceptPolicy}
                            onChange={handleChange}
                        />
                        <label>
                            Acepto las{" "}
                            <a href="https://www.mincit.gov.co/getattachment/transparencia-y-acceso-a-la-informacion-publica/2-normativa/2-1-normativa-de-la-entidad-o-autoridad/politicas-lineamientos-y-manuales/2-1-5-3-manuales/2-1-5-3-6-manual-de-politicas-de-seguridad-y-priva/gtimo002-manual-polticas-sgspi.pdf.aspx">
                                políticas de tratamiento de datos
                            </a>
                        </label>
                        {errors.acceptPolicy && <p className="error">{errors.acceptPolicy}</p>}
                    </div>
                    <button type="submit">Registrarse</button>
                    {globalError && <p className="error">{globalError}</p>}
                    <div className="Registrar">
                        <p>¿Ya tienes cuenta?</p>
                        <Link to="/login">Iniciar Sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
