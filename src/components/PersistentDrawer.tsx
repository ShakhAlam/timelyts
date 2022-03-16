import {
    Box,
    Divider, Drawer, IconButton, List, ListItem,
    ListItemIcon, ListItemText, styled, useTheme
} from "@mui/material";
import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/Person';
import DraftIcon from '@mui/icons-material/Drafts';
import CalendarIcon from '@mui/icons-material/CalendarTodayTwoTone'

import ContactMailTwoToneIcon from '@mui/icons-material/ContactMailTwoTone';
import SubscriptionsTwoToneIcon from '@mui/icons-material/SubscriptionsTwoTone';
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';
import AutomationIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import ReportIcon from '@mui/icons-material/AssessmentTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

import { Link } from "react-router-dom";
import { link } from "fs";

const LinkWrapper = styled(Link)(({ theme }) => (
    {
        textDecoration: 'none',
        position: 'relative',
        color: theme.palette.mode === 'dark' ? 'green' : 'black',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: alpha(theme.palette.common.white, 0.00),
        // '&:hover': {
        //   backgroundColor: alpha(theme.palette.common.white, 0.05),
        // },
        //marginRight: theme.spacing(2),
        //   marginLeft: 0,
        //   width: '100%',
        //   [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(3),
        //     width: 'auto',
        //   }

    })
)


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const drawerWidth = 240;

type kmEvent = (e: any) => any

interface IProps {
    open?: boolean,
    handleDrawerClose(a: boolean): kmEvent
}


var map1 = new Map([['home', <HomeIcon />],
['calendar', <CalendarIcon />],
['drafts', <DraftIcon />],
['send-email', <MailIcon />],
['contacts', <ContactMailTwoToneIcon />],
['subscriptions',<SubscriptionsTwoToneIcon/>],
['publish',<PublishTwoToneIcon/>],
['automations',<AutomationIcon/>],
['analytics',<ReportIcon/>],
['logout',<LogoutTwoToneIcon/>]
])

const linkIconMap = (linkName: String) => {
    let component = null;

    if (!linkName)
        component = <HomeIcon />
    else
        component = map1.get(linkName.toLowerCase());

    if (!component)
        component = <HomeIcon />

    return component;
}

const PersistentDrawer: React.FC<IProps> = (props) => {
    const theme = useTheme();


    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}

            anchor="left"
            open={props.open}
            onClose={props.handleDrawerClose(false)}
        >
            <DrawerHeader>
                <IconButton onClick={props.handleDrawerClose(false)}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={props.handleDrawerClose(false)}
                onKeyDown={props.handleDrawerClose(false)}
            >
                <List>
                    {['Home', 'Calendar', 'Publish', 'Subscriptions', 'Contacts', 'Automations', 'Analytics'].map((text, index) => (
                        <ListItem button key={text} component={LinkWrapper} to={index === 0 ? "/" : '/' + text.replaceAll(' ','-').toLowerCase()} >
                            <ListItemIcon>
                                {linkIconMap(text)}
                            </ListItemIcon>
                            <ListItemText primary={text} />

                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Logout'].map((text, index) => (
                        <ListItem button key={text} component={LinkWrapper} to={index === 0 ? "/" : '/' + text.replaceAll(' ','-').toLowerCase()} >
                            <ListItemIcon>
                                {linkIconMap(text)}
                            </ListItemIcon>
                            <ListItemText primary={text} />

                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>

    );
}

export default PersistentDrawer
