import apiClient from "../api/axios";

export const getUserDetails = async () => {
    try {
        const response = await apiClient.get('/Auth/User-details'); // Adjust URL if necessary
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};

export const getUserCoins = async () => {
    try {
        const response = await apiClient.get('/User/user-coins'); // Adjust URL if necessary
        return response.data;
    } catch (error) {
        console.error("Error fetching user coins:", error);
        throw error;
    }
};

export const updateUserProfile = async (user) => {
    try {
        const response = await apiClient.put('/Auth/update-profile', user); // Ensure this matches your backend URL
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};