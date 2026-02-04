import { createContext, useState, useEffect } from "react";
import api from "../config/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { token, user: userData } = response.data;
            let finalUser = { ...userData };

            localStorage.setItem('token', token);

            // Fallback: Si no hay nombre, usar la parte del mail antes del @
            if (!finalUser.name && finalUser.email) {
                finalUser.name = finalUser.email.split('@')[0];
            }

            localStorage.setItem('user', JSON.stringify(finalUser));
            setUser(finalUser);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: error.response?.data?.message || "Error al iniciar sesión" };
        }
    };

    const register = async ({ nombre, email, password }) => {
        try {
            await api.post('/users', { name: nombre, email, password });
            return { success: true };
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: error.response?.data?.message || "Error al registrarse" };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
