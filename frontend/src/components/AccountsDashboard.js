import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";
import AccountCard from "./AccountCard";
import { Button, Grid } from "@mui/material";


const AccountsDashboard = () => {
    const [accounts , setAccounts] = useState([])

    useEffect(() => {
        axiosInstance.get('bank/accounts/'
        ).then((res) => {
            setAccounts(res.data)
        });
    }, []);


    const createAccount = () => {
        axiosInstance.post('bank/accounts/', {
            account_holder: 1,
        }).then((res) => {
            setAccounts([...accounts, res.data]);
            console.log(res)
        });
    }


    return (
        <>
        <Button variant="contained" style={{marginBottom: '20px'}} onClick={() => createAccount()}>Create New Account</Button>
        <Grid container columnGap={5} rowGap={5}>
        {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
        ))}
        </Grid>
        </>
    );
    }

export default AccountsDashboard;