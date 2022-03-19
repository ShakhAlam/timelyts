
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Grid } from '@mui/material';
import React from 'react';
import EventTypeCard from '../components/EventTypeCard';

import { DndProvider } from 'react-dnd'
//@ts-ignore
import { HTML5Backend } from 'react-dnd-html5-backend'


function Home() {

    return (

        <Box sx={{ flexGrow: 1, paddingTop: 12 }} >

            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                    <EventTypeCard />
                </Grid>

                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>
                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>
                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>
                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>

                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>

                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>

                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>

                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>

                <Grid item xs={12}  sm={6} md={3}>
                    <EventTypeCard />
                </Grid>
            </Grid>

        </Box>
    )

}

export default Home;