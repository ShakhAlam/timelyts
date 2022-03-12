import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Outlet
} from 'react-router-dom';

import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';


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
  const [darkModeChecked, setDarkModeChecked] = React.useState(false);


  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkModeChecked(event.target.checked)

    if (darkModeChecked) {
      theme = darkMode;
    } else {
      theme = lightMode;
    }

  };


  return (
    <Box>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PrimarySearchAppBar  handleDarkModeChange={handleDarkModeChange}
                              darkModeChecked={darkModeChecked} />
        <Outlet />
      </ThemeProvider>

    </Box>

  );
}

export default App;
