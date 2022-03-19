import { Box, Button, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import DateTimeAutoComplete from "./DateTimeAutocomplete"

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


interface ITimeRangeProps {

}

const TimeRangeView: React.FC<ITimeRangeProps> = (props) => {
    return (
        <Box sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Stack direction="row" spacing={2}>

                <DateTimeAutoComplete label="Start" /> <DateTimeAutoComplete label="End" /> <DeleteOutlineIcon />
            </Stack>
        </Box>
    )
}


interface IScheduleWeekViewDayProps {
    text: String
}


const ScheduleWeekViewDay: React.FC<IScheduleWeekViewDayProps> = (props) => {

    return (
        <Box>
            <Grid container direction="row" spacing={8}>
                <Grid item xs={1} sm={1} md={1} >
                    <Checkbox sx={{ paddingTop: '25px' }} />

                </Grid>
                <Grid item xs={1} sm={1} md={1} >
                    <Typography sx={{ paddingTop: '25px' }}>
                        {props.text}

                    </Typography>

                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <TimeRangeView />
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
