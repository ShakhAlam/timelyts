import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { isWeekend } from "date-fns";
import React from "react"
import BookingCalendarCard from "../components/BookingCalendarCard";
import BookingSessionInfoCard from "../components/BookingSessionInfoCard";


const BookingPage: React.FC = () => {

    const [value, setValue] = React.useState<Date | null>(new Date());

    return (
        <Box sx={{ justifyContent: 'center', width: '80%', flexGrow: 1, paddingTop: 12 }} >


            <Grid container spacing={1}>

                <Grid item xs={6} sm={6} md={3}>
                    
                    <BookingSessionInfoCard name='Shakh Alam'/>

                </Grid>


                <Grid item xs={6} sm={6} md={6}>

                    <BookingCalendarCard />

                </Grid>

            </Grid>


        </Box>
    );
}

export default BookingPage;
