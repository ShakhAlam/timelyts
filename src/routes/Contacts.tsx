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
import SubscriptionDateCard from '../components/SubscriptionDateCard';
import ContactCard from '../components/ContactCard';

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

export default function Contacts() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ justifyContent: 'center', width: '80%', flexGrow: 1, paddingTop: 12 }} >

            <Box sx={{ justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Upcoming" {...a11yProps(0)} />
                    <Tab label="Prospects" {...a11yProps(1)} />
                    <Tab label="All     Contacts" {...a11yProps(2)} />
                    <Button variant="text" endIcon={<DateRangeIcon />}> Date Range</Button>
                    <Button variant="text" endIcon={<FilterAltIcon />}>Filter</Button>

                    <Button variant="text" endIcon={<ExportIcon />}>Export</Button>
                </Tabs>

            </Box>
            <TabPanel value={value} index={0}>



                <SubscriptionDateCard date='Monday, May 22, 2022' />

                <ContactCard name='John Smith'
                    email='student@test.com'

                />

                <SubscriptionDateCard date='Monday, May 22, 2022' />

                <ContactCard name='Alison Wonder'
                    email='student@test.com'

                />

            </TabPanel>
            <TabPanel value={value} index={1}>

                <SubscriptionDateCard date='Monday, May 22, 2022' />

                <ContactCard name='Kimi Okirano'
                    email='student@test.com'

                />

                <SubscriptionDateCard date='Monday, May 22, 2022' />

                <ContactCard name='Reene Karp'
                    email='student@test.com'

                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SubscriptionDateCard date='Monday, May 22, 2022' />

                <ContactCard name='Ali Mohammed'
                    email='student@test.com'

                />

                <SubscriptionDateCard date='Monday, May 22, 2022' />

                <ContactCard name='Aria Wolfram'
                    email='student@test.com'

                />
            </TabPanel>
        </Box>
    );
}

