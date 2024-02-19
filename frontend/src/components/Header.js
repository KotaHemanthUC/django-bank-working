import React from "react";
import Logout from "./Logout";
import { Grid } from "@mui/material";


const Header = () => {


    return (
        <Grid container columnGap={5}>
        <div>
            <h1>Header</h1>
            </div>
            <Logout />
        </Grid>
    );
}

export default Header;