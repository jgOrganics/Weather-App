import React, { useState, useCallback, useEffect } from "react";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirTwoToneIcon from '@mui/icons-material/AirTwoTone'; 
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";
import { Box, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

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

  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchCity, setSearchCity] = useState<string>("");


  const fetchCurrentWeather = useCallback(async (lat: number, lon: number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  },
    [api_Endpoint, api_key]
  );


  const fetchWeatherData = async (city: string) => {
    try {
      const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
      const searchResponse = await axios.get(url);
      const currentWeatherData: WeatherDataProps = searchResponse.data;
      return { currentWeatherData };
    } catch (error) {
      throw error;
    }
  };

  const handleSearch = async () => {
    if (searchCity.trim() === "") {
      return;
    }
    try {
      const { currentWeatherData } = await fetchWeatherData(searchCity);
      setWeatherData(currentWeatherData);
    } catch (error) {
    }
  };

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


  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const [currentWeather] = await Promise.all([fetchCurrentWeather(latitude, longitude)]);
        setWeatherData(currentWeather);
        setIsLoading(true);
      });
    };

    fetchData();
  }, [fetchCurrentWeather]);

  return (
    <Box sx={{
      height: "100vh",
      background: "#ccf2dd"
    }}>
      <Box sx={{
        backgroundColor: '#ffffff7d', // Semi-transparent white
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
            sx={{ width: 250 }}
            type="text"
            placeholder="enter a city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />

          <Box sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginBottom: 1,
            backgroundColor: 'grey', // adjust color as needed
            cursor: 'pointer',
          }}
          >
            <SearchIcon sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              // backgroundColor: 'grey', // adjust color as needed
              cursor: 'pointer',
            }} onClick={handleSearch} />
          </Box>
        </Box>

        {weatherData && isLoading ? (
          <>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              margin: '30px 0',
            }}>
              <Typography sx={{ fontSize: 50 }} >{weatherData.name}</Typography>
              <Typography>{weatherData.sys.country}</Typography>
              <Box sx={{ fontSize: '10rem' }}>
                {iconChanger(weatherData.weather[0].main)}
              </Box>
              <Typography sx={{ fontSize: 50 }}>{weatherData.main.temp.toFixed(0)}</Typography>
              <Typography>{weatherData.weather[0].main}</Typography>
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
                  <Typography>{weatherData.main.humidity}%</Typography>
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
                  <Typography>{weatherData.wind.speed}km/h</Typography>
                  <Typography>Wind speed</Typography>
                </Box>
              </Box>
            </Box>
          </>
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
            <HourglassBottomIcon />
            <Typography>Loading</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DisplayWeather;