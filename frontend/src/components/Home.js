import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TransactionsDashboard from './TransactionsDashboard';
import AccountsDashboard from './AccountsDashboard';
import Logout from './Logout';
import axiosInstance from '../axios';
import { UserContext } from '../';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const VerticalTabs = () => {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useState({});


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  



  return (
    <>
        <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: '100%', height: '90vh'}}
    >

      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderTop: 1,  borderColor: 'divider', width: '15%'}}
      >
        <Tab label="Accounts" {...a11yProps(0)} />
        <Tab label="Transactions" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AccountsDashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TransactionsDashboard  />
      </TabPanel>
    </Box>
        </>
    
  );
}

export default VerticalTabs;