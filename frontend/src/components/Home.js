import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TransactionsDashboard from "./bank/TransactionsDashboard";
import AccountsDashboard from "./bank/AccountsDashboard";
import useBankApi from "../hooks/useBankApi";
import useAuth from "../hooks/useAuth";
import useTabs from "../hooks/useTabs";
import Header from "./Header";
import { a11yProps, TabPanel } from "./TabsPanel";


const Home = () => {
  const { accounts, transactions, createNewAccount } = useBankApi();
  const { currentUser } = useAuth();
  const {currentTab, setCurrentTab} = useTabs('accounts');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
    <Header currentUser={currentUser} />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          width: "100%",
          height: "90vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderTop: 1,
            borderColor: "divider",
            width: "15%",
          }}
        >
          <Tab label="Accounts" value={'accounts'} {...a11yProps(0)} />
          <Tab label="Transactions" value={'transactions'} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={currentTab} index={'accounts'}>
          <AccountsDashboard
            accounts={accounts}
            createNewAccount={createNewAccount}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={'transactions'}>
          <TransactionsDashboard transactions={transactions} />
        </TabPanel>
      </Box>
    </>
  );
};

export default Home;
