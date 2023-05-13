import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../services/userService";

interface AuthContextProps {
    authenticated: boolean;
    user: User;
    login: (user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({} as User);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (loggedUser: User) => {
        setUser(loggedUser);
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(loggedUser));
    };

    const logout = () => {
        setUser({} as User);
        setAuthenticated(false);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ authenticated, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
