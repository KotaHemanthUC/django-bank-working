import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatISO } from "date-fns";
import useBankApi from "../hooks/useBankApi";

const CreateTransactionForm = () => {
  const {accounts, createNewTransaction} = useBankApi();
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    tranaction_type: "",
    amount: "",
    account: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const {name, value} = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      date: formatISO(new Date()),
    };
    createNewTransaction(data);
    navigate("/home?tab=transactions");
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2} sx={{padding:'10%'}}>
      <Typography sx={{textAlign:'center'}} variant="h5">Create New Transaction</Typography>
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
              required
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
              required
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
