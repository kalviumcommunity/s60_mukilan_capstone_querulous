
import {  createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const login = (data) => {
        localStorage.setItem("token",data.token);
        setIsAuthenticated(true)
    }

    // const logout = () => {
    //     localStorage.removeItem("token");
    //     setIsAuthenticated(false)
    // }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}

        </AuthContext.Provider>
    )
}
