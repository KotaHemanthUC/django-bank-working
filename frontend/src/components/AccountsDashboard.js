import React from "react";
import AccountCard from "./AccountCard";
import { Button, Grid } from "@mui/material";
import PropTypes from 'prop-types';

const AccountsDashboard = (props) => {

    return (
        <>
        <Button variant="contained" style={{marginBottom: '20px'}} onClick={() => props.createNewAccount()}>Create New Account</Button>
        <Grid container columns={5} columnGap={5} rowGap={5}>
        { props.accounts?.map((account) => (
            <Grid key={account.id} item xs={2}>
            <AccountCard  account={account} />
            </Grid>
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