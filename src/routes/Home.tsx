
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import EventTypeCard from '../components/EventTypeCard';

import { DndProvider } from 'react-dnd'
//@ts-ignore
import { HTML5Backend } from 'react-dnd-html5-backend'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Link } from 'react-router-dom';



function Home() {

    return (

        <Box sx={{ flexGrow: 1, paddingTop: 12 }} >

            <Grid container spacing={2} justifyContent="flex-end" sx={{ paddingTop: '10px' }}>

                {/* <Grid item xs={9} sm={9} md={9} >
                
                 <Stack direction="row" spacing={2}>
                     <Button variant="outlined" startIcon={<ScheduleIcon />}>
                         Work Days
                     </Button>
                     <Button variant="outlined" startIcon={<ScheduleIcon />}>
                         Vacation
                     </Button>

                     <Button variant="outlined" startIcon={<EventRepeatIcon />}>
                         On The Road
                     </Button>

                     <Button variant="outlined" startIcon={<CalendarIcon />}
                            >
                         On The Road
                     </Button>

                    
                 </Stack>

             </Grid> */}
                <Grid item xs={12} sm={12} md={3}>
                    <Button component={Link} to="/publish" variant="outlined" startIcon={<AddCircleOutlineIcon />}
                        sx={{ borderRadius: '20px', width: '100%' }}>
                        Publish New Session Type
                    </Button>
                </Grid>
                <Grid item xs={0} sm={0} md={0}>

                </Grid>

            </Grid>
            <br />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='60' sessionType='1:1' name='Intro to CS' />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='90' sessionType='1:1' name='Discrete Mathematics' />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='30' sessionType='1:1' name='Algorithms' />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='90' sessionType='1:1' name='Scala' />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='90' sessionType='1:1' name='Theory of Computation' />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='60' sessionType='1:1' name='Intro to Haskell' />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='60' sessionType='1:1' name='Operating Systems' />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='60' sessionType='1:1' name='AWS Cloud Computing' />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='60' sessionType='1:1' name='UNIX System Programming' />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard sessionLen='90' sessionType='1:1' name='Distributed Systems' />
                </Grid>
            </Grid>

        </Box>
    )

}

export default Home;