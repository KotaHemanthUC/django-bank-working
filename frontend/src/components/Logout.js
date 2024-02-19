import React from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axiosInstance
            .post(`users/logout/blacklist/`, {
                refresh_token: localStorage.getItem('refresh_token'),
            })
            .then((res) => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                navigate('/login');
                console.log(res);
            });
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
