import {useState} from "react";
import '../assets/Login.css';
import {Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email, // Captura el estado del email
            password: password, // Captura el estado de la contraseña
        };

        try {
            const response = await fetch(
                "http://retailspace.somee.com/api/Users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData), // Convertimos los datos a formato JSON
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage("Login failed: " + errorData.message);
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }

            const data = await response.json();
            console.log("Login successful", data);

            // Lógica adicional: por ejemplo, guardar el token o redirigir al usuario
        } catch (error) {
            console.error("Login failed:", error.message);
            setErrorMessage("Failed to login: " + error.message);
        }
    };

    return (
        <body className="login">
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
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
        </body>
    );
};

export default Login;
