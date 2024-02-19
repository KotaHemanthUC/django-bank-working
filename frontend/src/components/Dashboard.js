import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";


const Dashboard = () => {
    const [accounts , setAccounts] = useState([])

    useEffect(() => {
        axiosInstance.get('bank/accounts/')
            .then((res) => {
                setAccounts(res.data)
                console.log(res.data)
            });
    }, []);


    return (
        <div>
        <h1>Dashboard</h1>
        {accounts.map((account) => (
            <div key={account.id}>
                <h2>{account.account_number}</h2>
                <p>{account.account_id}</p>
                <p>{account.balance}</p>
            </div>
        ))}
        </div>
    );
    }

export default Dashboard;