import axiosInstance from "./axios";

const handleApiResponse = async (request) => {
    try {
        const response = await request;
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API error:", error.response || error.message || error);
        return {
            success: false,
            error: error.response ? error.response.data : { message: error.message },
        };
    }
};

export const getCurrentUser = async () => {
    const response = await handleApiResponse(axiosInstance.get('users/current_user/'));
    if (response.success) {
        return response.data;
    } else {
        console.error("Error getting current user:", response.error);
        return false;
    }
};

export const apiLogin = async (username, password) => {
    const response = await handleApiResponse(axiosInstance.post(`api/token/`, {
        email: username,
        password: password,
    }));
    if (response.success) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
        return true;
    } else {
        return false;
    }
};

export const apiLogout = async () => {
    const response = await handleApiResponse(axiosInstance.post(`users/logout/blacklist/`, {
        refresh_token: localStorage.getItem('refresh_token'),
    }));

    if (response.success) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axiosInstance.defaults.headers['Authorization'];
        return true;
    } else {
        return false;
    }
};

export const apiSignup = async (email, username, password) => {
    const response = await handleApiResponse(axiosInstance.post(`users/create/`, {
        email: email,
        username: username,
        password: password,
    }));
    return response;
};
