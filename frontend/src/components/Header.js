import React from "react";
import { Grid } from "@mui/material";
import Logout from "./auth/Logout";

const Header = (props) => {
    return (
        <Grid container style={{ marginLeft: "10px" }}>
        <Grid item xs={11}>
          <h2>Hi, {props.currentUser?.user_name} </h2>
        </Grid>
        <Grid item xs={1} style={{ margin: "auto" }}>
          <Logout />
        </Grid>
      </Grid>
    );
    }

export default Header;