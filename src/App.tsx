import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet
} from 'react-router-dom';

import Home from './routes/Home'
import Profile from './routes/Profile'
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, Switch } from '@mui/material';


const darkMode = createTheme({
  
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "black",
          //color: "red"
        }
      }
    }
  }
});

const lightMode = createTheme({
  typography: {
    allVariants: {
      color: "black"
    },
  },
  
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: "#000000"
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white"
        }
      }
    }
  }
});

var theme = darkMode;
//const theme = lightMode;



function App() {
  const [checked, setChecked] = React.useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)

    if (checked) {
      theme = darkMode;
    } else {
      theme = lightMode;
    }

  };


  return (
    <Box>

      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PrimarySearchAppBar />
        <Outlet />
      </ThemeProvider>

    </Box>

  );
}

export default App;
