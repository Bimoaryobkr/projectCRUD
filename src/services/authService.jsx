import apiClient from "./apiClient";

const login = async (email, password) => {
    try {
        const response = await apiClient.post("/login", { email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("An unexpected error occurred during login.");
    }
};

const register = async (email, password) => {
    try {
        const response = await apiClient.post("/register", { email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("An unexpected error occurred during registration.");
    }
};

const authService = {
    login,
    register,
};

export default authService;
