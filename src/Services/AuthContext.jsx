import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userTypeId, setUserTypeId] = useState(null);
    const [permissionId, setPermissionId] = useState(null);

    const login = (userType, permission) => {
        setUserTypeId(userType);
        setPermissionId(permission);
    };

    const logout = () => {
        setUserTypeId(null);
        setPermissionId(null);
    };

    return (
        <AuthContext.Provider value={{ userTypeId, permissionId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
