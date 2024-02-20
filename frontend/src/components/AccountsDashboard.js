import React, {useEffect, useState} from "react";
import AccountCard from "./AccountCard";
import { Button, Grid } from "@mui/material";
import { getAccounts, createAccount } from "../services/bank";


const AccountsDashboard = () => {
    const [accounts , setAccounts] = useState([])

    useEffect(() => {
        getAccounts().then((res) => {
            setAccounts(res.data);
        });
    }, []);

    const createNewAccount = () => {
        createAccount().then((res) => {
            setAccounts([...accounts, res.data]);
        });
    }

    return (
        <>
        <Button variant="contained" style={{marginBottom: '20px'}} onClick={() => createNewAccount()}>Create New Account</Button>
        <Grid container columns={5} columnGap={5} rowGap={5}>
        {accounts.map((account) => (
            <Grid key={account.id} item xs={2}>
            <AccountCard  account={account} />
            </Grid>
        ))}
        </Grid>
        </>
    );
    }

export default AccountsDashboard;