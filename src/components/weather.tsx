import React, { useState, } from "react";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirTwoToneIcon from '@mui/icons-material/AirTwoTone';
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";

// import Autosuggest from 'react-autosuggest';
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";
import { Box, TextField, Typography,  } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
// import Autocomplete from '@mui/material/Autocomplete';

interface WeatherDataProps {

  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}


const DisplayWeather = () => {

  const api_key = "72c751450fe0d9481fa6d8f7bf2cb9c1";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherDataProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102C57";
        break;

      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get<WeatherDataProps>(
        `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`
      );

      setWeather(response.data);
      setIsLoading(true);
      console.log(response.data);
      setError(null);
    } catch (error) {
      setError('Entered city was not found!');
      // alert("This city not found");
      setWeather(null);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };



  return (

    <Box sx={{
      height: "100vh",
      background: "white"
    }}>
      <Box sx={{
        // backgroundColor: '#E5FCF5', // Semi-transparent white
        backgroundColor: '#B4D9EF', 
        // backgroundColor: '#F0F1F2', 
        borderRadius: '12px',
        padding: '5rem',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-70%, -50%)',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', // Adjusted rgba values
        boxSizing: 'border-box',
        color: 'rgba(0, 0, 0, 0.8)', // Consistent color with slight transparency
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Box sx={{
          marginTop: 1, // Adjust units as needed (px, rem, etc.)
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '100%',
        }}>


          <TextField
            sx={{ width: 300 }}
            type="text"
            placeholder="Enter city name"

            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Box>

        {weather ? (
          <>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              margin: '30px 0',
            }}>
              <Typography sx={{ fontSize: 50 }} >{weather.name}</Typography>
              <Typography>{weather.sys.country}</Typography>
              <Box sx={{ fontSize: '10rem' }}>
                {iconChanger(weather.weather[0].main)}
              </Box>
              <Typography sx={{ fontSize: 50 }}>{weather.main.temp.toFixed(0)}</Typography>
              <Typography>{weather.weather[0].main}</Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              fontFamily: '"Josefin Sans", sans-serif', // Adjust font family if needed
              margin: '10px',
              background: 'linear-gradient(90deg, rgba(243, 255, 253, 1) 0%, rgba(253, 255, 232, 1) 100%)',
              borderRadius: '12px',
              padding: '10px',
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 20px', // Adjust units as needed (px, rem, etc.)
              }}>
                <WaterDropIcon sx={{ fontSize: '2rem', marginRight: '10px' }} />
                <Box >
                  <Typography>{weather.main.humidity}%</Typography>
                  <Typography>Humidity</Typography>
                </Box>
              </Box>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 30px', // Adjust units as needed (px, rem, etc.)
              }}>
                <AirTwoToneIcon sx={{ fontSize: '2rem', marginRight: '10px' }} />
                <Box >
                  {/* <h1>{weatherData.wind.speed}km/h</h1> */}
                  <Typography>{weather.wind.speed}km/h</Typography>
                  <Typography>Wind speed</Typography>
                </Box>
              </Box>
            </Box>
          </>
        ) : isLoading ? (
          <Box sx={{
            height: '400px',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}>
            <HourglassBottomIcon />
            <Typography>Loading</Typography>
          </Box>
        ) : error ? (
          <Box sx={{
            height: '400px',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            color: "red"
          }}>
            {/* <HourglassBottomIcon /> */}
            <Typography >{error}</Typography>
          </Box>
        ) : (
          <Box sx={{
            height: '400px',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}>
            {/* <HourglassBottomIcon /> */}
            <Typography>Please enter the city name</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DisplayWeather;