import axiosInstance from "./axios";

export const isLoggedIn = () => {
    return axiosInstance.get('users/current_user/')
        .then((res) => {
            return true;
        }).catch((err) => {
            return false;
        });
}

export const getCurrentUser = () => {
    return axiosInstance.get('users/current_user/')
        .then((res) => {
            return res.data;
        }).catch((err) => {
            return false;
        });
}

export const apiLogin = (username, password) => {
    return axiosInstance
        .post(`api/token/`, {
            email: username,
            password: password,
        })
        .then((res) => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
            return true;
        }).catch((err) => {
            return false;
        });
}

export const apiLogout = () => {
    return axiosInstance
        .post(`users/logout/blacklist/`, {
            refresh_token: localStorage.getItem('refresh_token'),
        })
        .then((res) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            return true;
        }).catch((err) => {
            return false;
        });
}

