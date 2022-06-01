import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { isWeekend } from "date-fns";
import React from "react"


const BookingCalendarCard: React.FC = () => {

    const [value, setValue] = React.useState<Date | null>(new Date());

    return (


                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ opacity: '0.90'}}>

                        <StaticDatePicker<Date> 
                            orientation="landscape"
                            openTo="day"
                            value={value}
                            //shouldDisableDate={isWeekend}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            
                        />
                        </Box>
                    </LocalizationProvider>

    );
}

export default BookingCalendarCard;
