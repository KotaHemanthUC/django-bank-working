import React from "react";
import { getAccounts, getTransactions, createAccount, createTransaction} from "../services/bank";

/**
 * A hook to interact with the bank API
 * @returns {Object} An object containing the accounts, transactions, and functions to create a new account and transaction
 */

const useBankApi = () => {
    const [accounts, setAccounts] = React.useState([]);
    const [transactions, setTransactions] = React.useState([]);
  
    React.useEffect(() => {
      getAccounts().then((res) => setAccounts(res.data));
      getTransactions().then((res) => setTransactions(res.data));
    }, []);

    const createNewAccount = () => {
        createAccount().then((res) => {
          setAccounts([...accounts, res.data]);
        });
    };

    const createNewTransaction = (data) => {
        createTransaction(data).then((res) => {
            setTransactions([...transactions, res.data]);
        });
    }
  
    return { accounts, transactions, createNewAccount, createNewTransaction };
};

export default useBankApi;
