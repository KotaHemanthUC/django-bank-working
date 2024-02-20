import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TransactionsDashboard from "./TransactionsDashboard";
import AccountsDashboard from "./AccountsDashboard";
import Logout from "./Logout";
import Grid from "@mui/material/Grid";
import { getCurrentUser } from "../services/auth";
import { useSearchParams } from "react-router-dom";
import { getAccounts, createAccount, getTransactions } from "../services/bank";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accounts, setAccounts] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
  const [currentTab, setCurrentTab] = React.useState(
    parseInt(searchParams.get("tab")) || 0
  );
  
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    console.log("once");
    getAccounts().then((res) => {
      setAccounts(res.data);
    });
    getTransactions().then((res) => {
      setTransactions(res.data);
    });
    getCurrentUser().then((res) => {
      setUser(res);
    });
  }, []);

  React.useEffect(() => {
    if (searchParams.get("tab")) {
      setCurrentTab(parseInt(searchParams.get("tab")));
    }
  }, [searchParams]);

  React.useEffect(() => {
    searchParams.set("tab", currentTab);
    setSearchParams(searchParams);
  }, [currentTab, searchParams, setSearchParams]);

  const createNewAccount = () => {
    createAccount().then((res) => {
      setAccounts([...accounts, res.data]);
    });
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Grid container style={{ marginLeft: "10px" }}>
        <Grid item xs={11}>
          <h2>Hi, {user?.user_name} </h2>
        </Grid>
        <Grid item xs={1} style={{ margin: "auto" }}>
          <Logout />
        </Grid>
      </Grid>
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
          <Tab label="Accounts" {...a11yProps(0)} />
          <Tab label="Transactions" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <AccountsDashboard
            accounts={accounts}
            createNewAccount={createNewAccount}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <TransactionsDashboard transactions={transactions} />
        </TabPanel>
      </Box>
    </>
  );
};

export default Home;
