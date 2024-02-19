import axios from 'axios';

const baseURL = 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('access_token') ? `JWT ${localStorage.getItem('access_token')}` : null ,
        Accept: 'application/json'
    }
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            const originalRequest = error.config;

            // if we get no response from the server, we likely have a CORS issue

            if (typeof error.response === 'undefined') {
                alert(
                    'A server/network error occurred. Check your connection and try again.'
                );
                return Promise.reject(error);
            }
            
            // If we we get a 401 and we are trying to refresh the token, we have an expired refresh token and need to log in again

            if (
                error.response.status === 401 &&
                originalRequest.url === baseURL + 'api/token/refresh/'
            ) {
                window.location.href = '/login/';
                return Promise.reject(error);
            }

            // if we get a 401 and we are not trying to refresh the token, we likely have an expired access token and need to refresh it
    
            if (
                error.response.data.code === 'token_not_valid' &&
                error.response.status === 401 &&
                error.response.statusText === 'Unauthorized'
            ) {
                const refreshToken = localStorage.getItem('refresh_token');
    
                if (refreshToken) {

                    // tokens are encoded in base64, so we need to decode them using atob
                    // then take the payload at index 1 and parse it as JSON
                    // this gives us the expiration time of the token

                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);
    
                    if (tokenParts.exp > now) {
                        return axiosInstance
                            .post('api/token/refresh/', { refresh: refreshToken })
                            .then((response) => {
                                console.log(response);  
                                localStorage.setItem('access_token', response.data.access);
    
                                axiosInstance.defaults.headers['Authorization'] =
                                    'JWT ' + response.data.access;
                                originalRequest.headers['Authorization'] =
                                    'JWT ' + response.data.access;
    
                                return axiosInstance(originalRequest);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        console.log('Refresh token is expired', tokenParts.exp, now);
                        window.location.href = '/login/';
                    }
                } else {
                    console.log('Refresh token not available.');
                    window.location.href = '/login/';
                }
            }
            return Promise.reject(error);
        }
    );

export default axiosInstance;