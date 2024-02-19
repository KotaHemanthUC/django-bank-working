import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";


const TransactionsDashboard = () => {
    const [transactions , setTransactions] = useState([])

    useEffect(() => {
        axiosInstance.get('bank/transactions/')
            .then((res) => {
                setTransactions(res.data)
            });
    }, []);

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell>ID</TableCell>
                <TableCell align="center" >Date</TableCell>
                <TableCell align="center" >Transaction Type</TableCell>
                <TableCell align="center" >Account Number</TableCell>
                <TableCell align="center" >Note</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" align="center" scope="row">
                    {transaction.id}
                  </TableCell>
                  <TableCell component="th" align="center" scope="row">
                    {transaction.date}
                  </TableCell>
                  <TableCell align="center">{transaction.transaction_type}</TableCell>
                  <TableCell align="center">{transaction.account}</TableCell>
                  <TableCell align="center">{transaction.note}</TableCell>
                  <TableCell align="center"> {(transaction.transaction_type === 'CREDIT' && '+') || '-'}{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

export default TransactionsDashboard;