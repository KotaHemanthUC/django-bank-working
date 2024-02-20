import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useAuth  from "../../hooks/useAuth";


const Logout = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Logout;
