import React from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


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
            });
    };

    return (
        <div>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Logout;
