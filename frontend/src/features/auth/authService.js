import api from '../api';

const API_URL = '/users';

// Register user
const register = async (userData) => {
    const response = await api.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await api.post(`${API_URL}/login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => localStorage.removeItem('user');

const authService = {
    register,
    login,
    logout,
};

export default authService;
