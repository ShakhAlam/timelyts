
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExportIcon from '@mui/icons-material/SystemUpdateAlt';
import SubscriptionCard from '../components/SubscriptionCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Subscriptions() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{  justifyContent: 'center', width: '80%' ,flexGrow: 1, paddingTop: 12 }} >

      <Box sx={{  justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          <Tab label="Past" {...a11yProps(2)} />
          <Button variant="text" endIcon={<DateRangeIcon />}> Date Range</Button>
          <Button variant="text" endIcon={<FilterAltIcon />}>Filter</Button>
          
          <Button variant="text" endIcon={<ExportIcon />}>Export</Button>
        </Tabs>

      </Box>
      <TabPanel value={value} index={0}>
        Upcoming Subscriptions
      </TabPanel>
      <TabPanel value={value} index={1}>
        Pending Subscriptions
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SubscriptionCard name='Test Subscription'/>
      </TabPanel>
    </Box>
  );
}

