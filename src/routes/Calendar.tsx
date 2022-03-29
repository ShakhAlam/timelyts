
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import EventTypeCard from '../components/EventTypeCard';

import CalendarIcon from '@mui/icons-material/DateRange'

import ScheduleIcon from '@mui/icons-material/Schedule';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import ScheduleCard from '../components/ScheduleCard'

import { DndProvider } from 'react-dnd'
//@ts-ignore
import { HTML5Backend } from 'react-dnd-html5-backend'


function Calendar() {


    
    return (
        <Box  sx={{ justifyContent:'center',  flexGrow: 1, paddingTop: 12, width: '100%'}} >
             {/* <Typography sx={{color:'grey', fontSize: '.8rem' }}>
                 Choose a schedule below to edit or create a new one that you can apply to your event types
             </Typography> */}
             <Grid container spacing={2}  justifyContent="flex-end" sx={{paddingTop:'10px'}}>
             
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
                         <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}
                          sx={{borderRadius: '20px', width: '100%'}}>
                             Add New Schedule
                         </Button>
                 </Grid>
                 <Grid item xs={0} sm={0} md={2}>
                         
                 </Grid>

             </Grid>

             <Grid container justifyContent="center" spacing={1} sx={{paddingTop: '24px', paddingLeft: 0}}>
                 
                 <Grid item xs={12} sm={12} md={9}>
                   <ScheduleCard name='Work Days' />
                 </Grid>
             </Grid> 


             <Grid container   justifyContent="center"  spacing={1} sx={{paddingTop: '24px', paddingLeft: 0}}>
                 <Grid item xs={12} sm={12} md={9}>
                   <ScheduleCard name='Vacation'/>
                 </Grid>
             </Grid> 

            
        </Box>

//         <Box sx={{ flexGrow: 1, paddingTop: 12 }} >
//             <Typography sx={{color:'grey', fontSize: '.8rem' }}>
//                 Choose a schedule below to edit or create a new one that you can apply to your event types
//             </Typography>
//             <Grid container spacing={1}>
//                 <Grid item xs={9} sm={9} md={9} >
                    
//                     <Stack direction="row" spacing={2}>
//                         <Button variant="outlined" startIcon={<ScheduleIcon />}>
//                             Work Days
//                         </Button>
//                         <Button variant="outlined" startIcon={<ScheduleIcon />}>
//                             Vacation
//                         </Button>

//                         <Button variant="outlined" startIcon={<EventRepeatIcon />}>
//                             On The Road
//                         </Button>

//                         <Button variant="outlined" startIcon={<CalendarIcon />}
//                                >
//                             On The Road
//                         </Button>

                        
//                     </Stack>

//                 </Grid>
//                 <Grid item xs={3} sm={3} md={3}>
//                         <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}
//                          sx={{borderRadius: '20px'}}>
//                             Add New Schedule
//                         </Button>
//                 </Grid>

//             </Grid>
// {/* 
//             <Grid container spacing={1} sx={{paddingTop: '24px', paddingLeft: 0}}>
//                 <Grid item xs={12} sm={12} md={12}>
//                     <ScheduleCard />
//                  </Grid>
//             </Grid> */}



//         </Box>
    )

}

export default Calendar;