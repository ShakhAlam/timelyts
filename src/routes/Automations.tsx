
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Grid } from '@mui/material';
import React from 'react';
import EventTypeCard from '../components/EventTypeCard';

import { DndProvider } from 'react-dnd'
//@ts-ignore
import { HTML5Backend } from 'react-dnd-html5-backend'
import WorkflowSummaryCard from '../components/WorkflowSummaryCard';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';

function Automations() {

    return (

        <Box sx={{ flexGrow: 1, paddingTop: 12 }} >

            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                    <WorkflowSummaryCard  name='Email Reminder to Contact' description='' icon={<EmailIcon />} />
                </Grid>

                <Grid item xs={12}  sm={6} md={3}>
                    <WorkflowSummaryCard name='Email Reminder to Host' description='' icon={<EmailIcon />} />
                </Grid>

                <Grid item xs={12}  sm={6} md={3}>
                    <WorkflowSummaryCard name='Send Thank You Email to Contact' description='' icon={<EmailIcon />} />
                </Grid>
                <Grid item xs={12}  sm={6} md={3}>
                    <WorkflowSummaryCard  name='Text Reminder to Contact' description='' icon={<SmsIcon />} />
                </Grid>
                <Grid item xs={12}  sm={6} md={3}>
                    <WorkflowSummaryCard  name='Text Reminder to Host' description='' icon={<SmsIcon />} />
                </Grid>
            </Grid>

        </Box>
    )

}

export default Automations;