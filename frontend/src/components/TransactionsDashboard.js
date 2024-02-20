import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";


const TransactionsDashboard = (props) => {
    const navigate = useNavigate();
    return (
        <>
        <Button variant="contained" style={{marginBottom: '10px'}} onClick={() => navigate('/transactions/create')}>Create New Transaction</Button>
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
              {props.transactions?.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" align="center" scope="row">
                    {transaction.id}
                  </TableCell>
                  <TableCell component="th" align="center" scope="row">
                    {format(transaction.date, 'PP' )}
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
        </>
      );
    }

export default TransactionsDashboard;