import React from "react";
import AccountCard from "./AccountCard";
import { Button, Grid } from "@mui/material";
import PropTypes from 'prop-types';

const AccountsDashboard = (props) => {

    return (
        <>
        <Button variant="contained" style={{marginBottom: '20px'}} onClick={() => props.createNewAccount()}>Create New Account</Button>
        <Grid container columns={12} columnGap={4}>
        { props.accounts?.map((account) => (
            <AccountCard  account={account} />
        ))}
        </Grid>
        </>
    );
}

AccountCard.propTypes = {
    accounts: PropTypes.array,
    createNewAccount: PropTypes.func
}

export default AccountsDashboard;