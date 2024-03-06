import React from 'react';
import './App.css';
import DisplayWeather from './components/weather';
import ".././src/styles/weather.css";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Mobile devices
      sm: 600, // Tablets
      md: 960, // Desktops
      lg: 1280, // Laptops
      xl: 1920, // Large desktops
    },
  },
});
function App() {
  return (
      <ThemeProvider theme={theme}>
       <DisplayWeather />
    </ThemeProvider>
  );
}

export default App;
