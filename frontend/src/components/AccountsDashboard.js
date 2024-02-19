import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";
import AccountCard from "./AccountCard";
import { Grid } from "@mui/material";


const AccountsDashboard = () => {
    const [accounts , setAccounts] = useState([])

    useEffect(() => {
        axiosInstance.get('bank/accounts/'
        )
            .then((res) => {
                setAccounts(res.data)
            });
    }, []);


    return (
        <div>
        <h1>Accounts</h1>
        <Grid container columnGap={5} rowGap={5}>
        {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
        ))}
        </Grid>
        </div>
    );
    }

export default AccountsDashboard;