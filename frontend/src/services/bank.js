import axiosInstance from "./axios";
import { getUserIdFromToken } from "../helpers";

export const getAccounts = async () => {
    return await axiosInstance.get('bank/accounts/');
}

export const createAccount = async () => {
    return await axiosInstance.post('bank/accounts/', {
        account_holder: getUserIdFromToken(),
    });
}

export const getTransactions = async () => {
    return await axiosInstance.get('bank/transactions/');
}

export const createTransaction = async (formData) => {
    return await axiosInstance.post('bank/transactions/', formData);
}

export const getBalanceOnDate = async (date, account_id) => {
    return await axiosInstance.get(`bank/accounts/balance-on-date?date=${date}&account_id=${account_id}`);
}

