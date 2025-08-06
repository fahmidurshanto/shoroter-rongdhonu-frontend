import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for token in localStorage on initial load
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, you'd verify this token with your backend
            // For now, we'll just assume a token means a logged-in user
            setUser({ isAuthenticated: true, token });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ isAuthenticated: true, token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
