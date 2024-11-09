import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/Login.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth } from '../Services/AuthContext.jsx';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [permissionxusers, setPermissionsXUser] = useState([]);
    const [users, setUser] = useState([]);

    useEffect(() => {
        const fetchPermissionXUser = async () => {
            try {
                const response = await axios.get("https://retailspace.somee.com/api/PermissionsXUsers");
                if (Array.isArray(response.data)) {
                    setPermissionsXUser(response.data);
                } else {
                    console.error("Expected an array but received:", response.data);
                }
            } catch (error) {
                console.error("Error fetching permissionxuser:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await axios.get("https://retailspace.somee.com/api/Users");
                if (Array.isArray(response.data)) {
                    setUser(response.data);
                } else {
                    console.error("Expected an array but received:", response.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchPermissionXUser();
        fetchUser();
    }, []);

    const validateLoginFields = () => {
        if (!email || !password) {
            setErrorMessage("Por favor, completa todos los campos.");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 

        // Validar campos vacíos
        if (!validateLoginFields()) return;

        const loginData = { email, password };

        try {
            const response = await fetch(
                "https://retailspace.somee.com/api/Users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData),
                }
            );

            if (response.status === 404) {
                // Si el código de estado es 404, significa que las credenciales son incorrectas
                setErrorMessage("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.");
                return;
            } else if (!response.ok) {
                // Si hay otros errores no relacionados con autenticación
                const errorData = await response.json();
                setErrorMessage("Error al iniciar sesión: " + (errorData.message || "Error desconocido."));
                return;
            }
    

            const data = await response.json();
            console.log("Login successful", data);

            const loggedInUser = users.find(user => user.email === email);

            if (loggedInUser) {
                localStorage.setItem("userId", loggedInUser.userId);

                const permission = permissionxusers.find(
                    (permissionxuser) => loggedInUser.userTypes.userTypeId === permissionxuser.userTypes.userTypeId
                );

                if (!permission) {
                    setErrorMessage("No se encontraron permisos para este usuario.");
                    return;
                }

                // Iniciar sesión y redirigir según el tipo de usuario y permisos
                login(loggedInUser.userId, permission.userTypes.userTypeId, permission.permissions.permissionId);
                if (loggedInUser.userTypes.userTypeId === 1 && permission.permissions.permissionId === 1) {
                    localStorage.setItem("userTypeId", permission.userTypes.userTypeId);
                    localStorage.setItem("permissionId", permission.permissions.permissionId);
                    navigate("/Admin");
                } else if (loggedInUser.userTypes.userTypeId === 2 && permission.permissions.permissionId === 2) {
                    localStorage.setItem("userTypeId", permission.userTypes.userTypeId);
                    localStorage.setItem("permissionId", permission.permissions.permissionId);
                    navigate("/Products");
                } else {
                    navigate("/");
                }
            } else {
                setErrorMessage("Usuario no encontrado.");
            }
        } catch (error) {
            setErrorMessage("Error al conectar con el servidor. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    <div className="Registrar">
                        <p>¿No tienes cuenta?</p>
                        <Link to="/CreateUser">Registrate aquí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
