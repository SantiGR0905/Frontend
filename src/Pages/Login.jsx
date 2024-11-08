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
                    console.log("Fetched permissionxusers:", response.data);
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
                    console.log("Fetched users:", response.data);
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

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password,
        };

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

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage("Login failed: " + errorData.message);
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Login successful", data);

            // Buscar el usuario en la lista de users usando el email
            const loggedInUser = users.find(user => user.email === email);
    
            if (loggedInUser) {
                const permission = permissionxusers.find((permissionxuser) =>
                    loggedInUser.userTypes.userTypeId === permissionxuser.userTypes.userTypeId
                );
                login(permission.userTypes.userTypeId, permission.permissions.permissionId);
                if (!permission) {
                    setErrorMessage("No permissions found for this user.");
                    return; 
                }

                console.log("UserTypeId:", loggedInUser.userTypes.userTypeId, "Type:", typeof loggedInUser.userTypes.userTypeId);
                console.log("Permission found:", permission);
                console.log("Permission UserTypeId:", permission.userTypes.userTypeId);
                console.log("Permission Id:", permission.permissions.permissionId); 

                // Usar directamente los IDs, asumiendo que ya son números
                const userTypeId = loggedInUser.userTypes.userTypeId; 
                const permissionId = permission.permissions.permissionId;

                // Verificar y redirigir según los permisos
                if (userTypeId === 1 && permissionId === 1) {
                    localStorage.setItem("userTypeId", permission.userTypes.userTypeId);
                    localStorage.setItem("permissionId", permission.permissions.permissionId);
                    console.log("Redirigiendo a Admin");
                    navigate("/Admin");
                } else {
                    console.log("Redirigiendo a la Home");
                    navigate("/");
                }
            } else {
                setErrorMessage("User not found.");
            }
        } catch (error) {
            console.error("Login failed:", error.message);
            setErrorMessage("Failed to login: " + error.message);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
