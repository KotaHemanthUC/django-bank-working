import React from "react";
import Logout from "./Logout";
import { Grid } from "@mui/material";
import axiosInstance from "../axios";



const Header = () => {
    const [currentUser, setCurrentUser] = React.useState({});
    const getCurrentUser = () => {
        axiosInstance.get('users/current_user/')
            .then((res) => {
                setCurrentUser(res.data);
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    
        React.useEffect(() => {
            getCurrentUser();
        }, []);

    return (
        <Grid container style={{marginLeft:'10px'}}>
        <Grid item xs={11}>
            <h2>Hi, {currentUser.user_name}</h2>
            </Grid>
            <Grid item xs={1} style={{margin:'auto'}}>
            <Logout />
            </Grid>
        </Grid>
    );
}

export default Header;