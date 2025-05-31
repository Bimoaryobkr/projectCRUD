import apiClient from "./apiClient";

const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

async function fetchUsersList(page = 1) {
    try {
        const response = await apiClient.get(`/users?page=${page}`);
        if (
            response.data &&
            Array.isArray(response.data.data) &&
            typeof response.data.total_pages === "number"
        ) {
            return {
                users: response.data.data,
                totalPages: response.data.total_pages,
            };
        } else {
            throw new Error(
                "User data or total_pages not found in the expected format."
            );
        }
    } catch (error) {
        console.error("Error in fetchUsersList:", error.message);
        const errorMessage =
            error.response?.data?.error ||
            "An unexpected error occurred while fetching the user list.";
        throw new Error(errorMessage);
    }
}

async function createUser(userData) {
    try {
        const response = await apiClient.post("/users", userData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error in createUser:", error.message);
        const errorMessage =
            error.response?.data?.error ||
            "An unexpected error occurred while creating the user.";
        throw new Error(errorMessage);
    }
}

async function updateUser(userId, userData) {
    try {
        const response = await apiClient.put(`/users/${userId}`, userData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error in updateUser:", error.message);
        const errorMessage =
            error.response?.data?.error ||
            "An unexpected error occurred while updating the user.";
        throw new Error(errorMessage);
    }
}

async function deleteUser(userId) {
    try {
        await apiClient.delete(`/users/${userId}`, {
            headers: getAuthHeaders(),
        });
        return { message: "User deleted successfully" };
    } catch (error) {
        console.error("Error in deleteUser:", error.message);
        if (error.response && error.response.status === 204) {
            return { message: "User deleted successfully (204)" };
        }
        const errorMessage =
            error.response?.data?.error ||
            "An unexpected error occurred while deleting the user.";
        throw new Error(errorMessage);
    }
}

const userService = {
    fetchUsersList,
    createUser,
    updateUser,
    deleteUser,
};

export default userService;
