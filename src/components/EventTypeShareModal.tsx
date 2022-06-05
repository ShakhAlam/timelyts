import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Tab, Tabs } from '@mui/material';
import ShareLinkCard from './ShareLinkCard';

const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    opacity: 80,
    p: 4,
};


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

interface IEventTypeShareModalProps {
    open: boolean,
    handleClose: any,
    name: String,
    sessionLen: String,
    sessionType: String
}

const EventTypeShareModal: React.FC<IEventTypeShareModalProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >

                    <h2>{props.name}</h2>
                    <Typography>{props.sessionType}</Typography>

                    <Box sx={{ justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Share a link" {...a11yProps(0)} />
                            <Tab label="Add to email" {...a11yProps(1)} />
                            <Tab label="Add to website" {...a11yProps(2)} />
                           
                        </Tabs>

                    </Box>
                    <TabPanel value={selectedTab} index={0}>
                        <ShareLinkCard 
                            onClose={props.handleClose}
                            link='http://localhost:3000/booking-page' />
                        
                    </TabPanel>
                    <TabPanel value={selectedTab} index={1}>

                    </TabPanel>
                    <TabPanel value={selectedTab} index={2}>

                        
                    </TabPanel>
                </Box>

            </Modal>
        </div>
    );
}


export default EventTypeShareModal;
