import axiosInstance from "./axios";
import { getUserIdFromToken } from "../helpers";

const handleApiResponse = async (request) => {
    try {
        const response = await request;
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API error:", error.response || error.message || error);
        return {
            success: false,
            error: error.response ? error.response.data : { message: error.message },
        };
    }
};

export const getAccounts = async () => {
    return handleApiResponse(axiosInstance.get('bank/accounts/'));
};

export const createAccount = async () => {
    const formData = {
        account_holder: getUserIdFromToken(),
    };
    if (!formData.account_holder) {
        return { success: false, error: { message: "User ID not found in token" } };
    }
    return handleApiResponse(axiosInstance.post('bank/accounts/', formData));
};

export const getTransactions = async () => {
    return handleApiResponse(axiosInstance.get('bank/transactions/'));
};

export const createTransaction = async (formData) => {
    return handleApiResponse(axiosInstance.post('bank/transactions/', formData));
};

export const getBalanceOnDate = async (date, account_id) => {
    const url = `bank/accounts/balance-on-date?date=${date}&account_id=${account_id}`;
    return handleApiResponse(axiosInstance.get(url));
};
