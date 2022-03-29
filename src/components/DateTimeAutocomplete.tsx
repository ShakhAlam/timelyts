import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<DateTimeOptionType>();

interface IDateTimeAutoCompleteProps {
    label: String
}

const DateTimeAutoComplete : React.FC<IDateTimeAutoCompleteProps> = (props) => {
  const [value, setValue] = React.useState<DateTimeOptionType | null>(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="date-time-autocomplete"
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={props.label} />
      )}
    />
  );
}

interface DateTimeOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films: readonly DateTimeOptionType[] = [
  { title: '9:00 AM', year: 1994 },
  { title: '9:00 PM', year: 1994 },
  { title: '10:00 AM', year: 1994 },
  { title: '11:00 AM', year: 1994 },
  { title: '12:00 PM', year: 1994 },
  { title: '1:00 PM', year: 1994 },
  { title: '2:00 PM', year: 1994 },
  { title: '3:00 PM', year: 1994 },
 ];

 export default DateTimeAutoComplete;