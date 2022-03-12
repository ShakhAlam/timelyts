import {
    Divider, Drawer, IconButton, List, ListItem,
    ListItemIcon, ListItemText, styled, useTheme
} from "@mui/material";
import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Link } from "react-router-dom";

const LinkWrapper = styled(Link)(({ theme }) => (
    {
      textDecoration: 'none',
      position: 'relative',
      color: theme.palette.mode === 'dark' ? 'green' : 'black' ,
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


interface IProps {
    open?: boolean,
    handleDrawerClose(): any
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
            variant="persistent"
            anchor="left"
            open={props.open}
        >
            <DrawerHeader>
                <IconButton onClick={props.handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {['Home', 'Profile', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}  component={LinkWrapper} to={ index === 0 ? "/" : '/' + text.toLowerCase()} >
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                         <ListItemText primary={text} />

                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>

    );
}

export default PersistentDrawer
