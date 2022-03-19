import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Outlet
} from 'react-router-dom';

import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, styled } from '@mui/material';
import { height, width } from '@mui/system';
import BgNightSky01 from './images/nightsky_02.jpg';
import BgDay01 from './images/day_01.jpg';
//import BgDay01 from './images/nightsky_01.jpg';


const darkMode = createTheme({
  
  palette: {
    mode: 'dark',
    primary: {
      main: '#ccd9e0',
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
      main: '#000000',
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

var theme = lightMode;
//const theme = lightMode;


const BoxStyled = styled(Box)(
  ({ theme }) => ({
      width:'100%', 
      padding: '18px',
      opacity: '0.9',
      height:"180vh",
      display:"flex",
      //flexDirection:"column",
      'background-attachment': 'fixed',
      backgroundImage: (function(theme){ console.log(theme.palette.mode); 
                                         console.log(`url(${BgNightSky01})` );
                                         console.log(`url(${BgDay01})` );
                        return theme.palette.mode === 'dark'? `url(${BgNightSky01})` : `url(${BgDay01})`;})(theme) 
                        //return theme.palette.mode === 'dark'? '' : `url(${BgDay01})`;})(theme) 
  }
  )
);

function App() {
  const [darkModeChecked, setDarkModeChecked] = React.useState(false);
  const [drawerOpen,setDrawerOpen] = React.useState(false);

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkModeChecked(event.target.checked)

    if (darkModeChecked) {
      theme = darkMode;
    } else {
      theme = lightMode;
    }

  };


  return (
    <ThemeProvider theme={theme}>
      <BoxStyled id='mainbox' 
        >

      
          <CssBaseline />
          <PrimarySearchAppBar  drawerOpen={drawerOpen} handleDarkModeChange={handleDarkModeChange}
                                darkModeChecked={darkModeChecked} 
                                
                                
                                />
          <Outlet />
        

      </BoxStyled>
    </ThemeProvider>

  );
}

export default App;
