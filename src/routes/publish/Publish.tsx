
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Grid, useMediaQuery } from '@mui/material';
import React from 'react';
import EventTypeCreateCard from './components/EventTypeCreateCard';

import { DndProvider } from 'react-dnd'
//@ts-ignore
import { HTML5Backend } from 'react-dnd-html5-backend'

import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Outlet } from 'react-router-dom';


function Publish() {

    const mdScreen = useMediaQuery('(min-width:600px)');

    return (


        <Box sx={{ justifyContent: 'center', flexGrow: 1, paddingTop: 12, width: '100%' }} >

            <Grid container spacing={0} sx={{ justifyContent: 'center' }}>
                <Grid item xs={11} sm={11} md={8}>
                    <EventTypeCreateCard 
                        title='One-on-One' 
                        type='one-on-one'
                        description='Let an invitee pick a time to meet with you.'
                        icon={<PersonIcon />}>

                    </EventTypeCreateCard>
                </Grid>

                <Grid item xs={11} sm={11} md={8}>
                    <EventTypeCreateCard
                        title='Group'
                        type='group'
                        description='Let multiple invitees meet with you at one time.'
                        icon={<GroupsIcon />}>


                    </EventTypeCreateCard >
                </Grid>


                <Grid item xs={11} sm={11} md={8}>
                    <EventTypeCreateCard
                        title='Collective'
                        type='collective'
                        description='Host an event with another person and let invitees pick a time when you’re all available.'
                        icon={<GroupWorkIcon />}>
                        


                    </EventTypeCreateCard>
                </Grid>

                <Grid item xs={11} sm={11} md={8}>
                    <EventTypeCreateCard
                        title='Round Robin'
                        type='round-robin'
                        description='Create an event that cycles between multiple hosts.' 
                        icon={<RestartAltIcon />}> 
                    </EventTypeCreateCard>
                </Grid>


            </Grid>

        </Box>
    )

}

export default Publish;