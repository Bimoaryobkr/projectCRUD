import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("authToken")
    );
    const [authError, setAuthError] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem("authToken");
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [token]);

    const login = useCallback(async (email, password) => {
        setIsLoadingAuth(true);
        setAuthError(null);
        try {
            const responseData = await authService.login(email, password);

            if (responseData && responseData.token) {
                setToken(responseData.token);
                return true;
            } else {
                throw new Error("Login successful, but no token received.");
            }
        } catch (error) {
            console.error("Login failed in AuthContext:", error);
            setAuthError(
                error.error ||
                    error.message ||
                    "An unknown login error occurred."
            );
            setToken(null);
            return false;
        } finally {
            setIsLoadingAuth(false);
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        console.log("User logged out");
    }, []);

    const value = {
        token,
        isAuthenticated,
        isLoadingAuth,
        authError,
        user,
        login,
        logout,
        setAuthError,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
