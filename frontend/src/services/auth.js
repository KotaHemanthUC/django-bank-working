import axiosInstance from "./axios";


/**
 * Get the current user from the API
 * @returns {Object} The current user
 */

export const getCurrentUser = () => {
    return axiosInstance.get('users/current_user/')
        .then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
            return false;
        });
}

/**
 * Log in to the API and store the access token in local storage
 * @param {String} username 
 * @param {String} password 
 * @returns {Boolean} Whether the login was successful
 */

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

/**
 * Log out of the API and remove the access token from local storage
 * @returns {Boolean} Whether the logout was successful
 */

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


/**
 * Sign up for the API
 * @param {String} email
 * @param {String} username
 * @param {String} password
 * @returns {Boolean} Whether the signup was successful
 */

export const apiSignup = (email, username, password) => {
    return axiosInstance
        .post(`users/register/`, {
            email: email,
            username: username,
            password: password,
        })
        .then((res) => {
            return true;
        }).catch((err) => {
            return false;
        });
}


