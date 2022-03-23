import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import {isMobile} from 'react-device-detect';

// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

const ExampleSelect = () => {
 
    const value = null;
    //@ts-ignore
    const onChange = (e) => console.log(e.target.value);
    const options = [
        {value: 1, label: 'Option 1'},
        {value: 2, label: 'Option 2'},
        {value: 3, label: 'Option 3'}
    ];

    return (

        <FormControl>
            <InputLabel>
                Options
            </InputLabel>
            <Select
                native={isMobile}
                value={value}
                onChange={onChange}
            >
                {options.map(option => (
                    isMobile ? (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ) : (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    )
                ))}
            </Select>
        </FormControl>

    )
}    

export default ExampleSelect;