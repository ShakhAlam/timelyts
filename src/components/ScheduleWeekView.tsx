import { Box, Button, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material"
import DateTimeAutoComplete from "./DateTimeAutocomplete"

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExampleSelect from "./ExampleSelect";
import { DateTimePicker, TimePicker } from "@mui/lab";
import React from "react";
import {isMobile, isIOS} from 'react-device-detect';

interface ITimeRangeProps {

}

const TimeRangeView: React.FC<ITimeRangeProps> = (props) => {
    return (
        <Box sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Stack direction="row" spacing={2}>
                {/* <ExampleSelect /> */}
                {isMobile ? ( isIOS ? <div> <input type='time' /> <input type='time' /> </div>:  <div />) :

                    (<div>
                        <DateTimeAutoComplete label="Start" /> 
                        <DateTimeAutoComplete label="End" /> 
                        <DeleteOutlineIcon />
                    </div>)
                }
                
            </Stack>
        </Box>
    )
}


interface IScheduleWeekViewDayProps {
    text: String
}


const ScheduleWeekViewDay: React.FC<IScheduleWeekViewDayProps> = ({ text }) => {
    const [value, setValue] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };


    return (
        <Box>
            <Grid container direction="row" spacing={8}>
                <Grid item xs={1} sm={1} md={1} >
                    <Checkbox sx={{ paddingTop: '25px' }} />

                </Grid>
                <Grid item xs={1} sm={1} md={1} >
                    <Typography sx={{ paddingTop: '25px' }}>
                        {text}

                    </Typography>

                </Grid>
                <Grid item xs={12} sm={6} md={6} >
                     <TimeRangeView /> 
                    {/* <TimePicker onOpen={() => {
                        setTimeout(() => {
                            const el = document.activeElement;
                            if (el) {
                                (el as HTMLElement).blur();
                            }
                        });
                    }}
                        label=""
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    /> */}
                </Grid>
                <Grid item xs={4} sm={4} md={4} sx={{ paddingTop: '25px' }}>

                    <IconButton aria-label="settings">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider />
        </Box>

    )
}

interface IScheduleWeekViewProps {

}

const ScheduleWeekView: React.FC<IScheduleWeekViewProps> = (props) => {

    return (
        <Box>
            <List>
                {['Sun', 'Mon', 'Wed', 'Thu', 'Fri', 'Sat'].map((text, index) => (

                    <ListItem button key={text} component={ScheduleWeekViewDay} text={text} >
                        {/* <ListItemIcon>
                                {linkIconMap(text)}
                            </ListItemIcon> */}
                        <ListItemText primary={text} />

                    </ListItem>


                ))}
            </List>

        </Box>
    )
}

export default ScheduleWeekView
