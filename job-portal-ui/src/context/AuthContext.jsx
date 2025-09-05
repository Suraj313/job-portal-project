import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ... (no changes to state or other functions)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        withCredentials: true 
    });

    useEffect(() => {
        api.get('/auth/user/')
            .then(response => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login/', { email, password });
        setUser(response.data.user);
    };

    // --- THIS IS THE CORRECTED SIGNUP FUNCTION ---
const signup = async (email, password, password2) => {
    await api.post('/auth/registration/', { 
        email, 
        username: email, 
        password1: password,
        password2: password2 
    });
    // This is the corrected line
    // The login function needs the original password
    await login(email, password); 
};

    const logout = async () => {
        await api.post('/auth/logout/');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;