import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { apiLogout } from "../services/auth";


const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        apiLogout();
        navigate('/login');
    };

    return (
        <div>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Logout;
