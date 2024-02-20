import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatISO } from "date-fns";
import { createTransaction, getAccounts } from "../services/bank";

const CreateTransactionForm = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAccounts().then((res) => {
      setAccounts(res.data);
    });
  }, []);

  const initialFormData = Object.freeze({
    tranaction_type: "",
    amount: "",
    account: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      date: formatISO(new Date()),
    };
    createTransaction(data).then((res) => {
      navigate("/home");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="trans-type-simple-select-label">
              Transaction Type
            </InputLabel>
            <Select
              labelId="trans-type-simple-select-label"
              id="trans-type-simple-select"
              label="Transaction Type"
              onChange={handleChange}
              name="transaction_type"
            >
              <MenuItem value={"CREDIT"}>CREDIT</MenuItem>
              <MenuItem value={"DEBIT"}>DEBIT</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="account-simple-select-label">Account</InputLabel>
            <Select
              labelId="account-simple-select-label"
              id="account-simple-select"
              label="Transaction Type"
              name="account"
              onChange={handleChange}
            >
              {accounts.map((account) => (
                <MenuItem  key={account.id} value={account.account_id}>
                  {account.account_id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            fullWidth
            id="note"
            label="Note"
            name="note"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Create Transaction
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateTransactionForm;
