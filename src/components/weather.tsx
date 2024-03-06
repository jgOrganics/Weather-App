import React, { useState, } from "react";
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
import { Box, TextField, Typography, useMediaQuery, } from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { CustomMainConatiner } from "../styles/Styles";
// import SearchIcon from '@material-ui/icons/Search';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

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

const styles = {

  iconButton: {
    padding: '5px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
};

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
        iconElement = <BsFillCloudRainFill
        />;
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
      <span className="icon" style={{ color: iconColor, }}>
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

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(min-width:601px) and (max-width:960px)');
  const isDesktop = useMediaQuery('(min-width:961px)');

  return (
    <CustomMainConatiner>
      {
        isMobile ? (
          <Box
            sx={{
              ml: 6,
              "@media (max-width:600px)": {
                width: "340px",
                height: "650px",
              },

              backgroundColor: '#80D0EB',
              borderRadius: '12px',
              padding: '5rem',
              position: 'absolute',
              top: '50%',
              left: '55%',
              transform: 'translate(-70%, -50%)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', // Adjusted rgba values
              boxSizing: 'border-box',
              color: 'rgba(0, 0, 0, 0.8)', // Consistent color with slight transparency
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}

          >
            <Box sx={{
              marginTop: 1, // Adjust units as needed (px, rem, etc.)
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
            }}>
              <TextField
                fullWidth
                variant="outlined"
                style={{ width: '600px' }}
                sx={{
                  width: 600,
                  "@media (max-width:600px)": {
                    margin: '-50px 0px 50px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  },
                }}
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <SearchIcon
                sx={{
                  // top:"-50px",
                  // ml: "20px",
                  ml: 10,
                  margin: '-50px -45px 50px 10px',
                  width: "50px",
                  height: "50px",
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={handleSearch}
              />

            </Box>

            {weather ? (
              <>
                <Box sx={{

                  width: "600px",
                  "@media (max-width:600px)": {
                    width: "300px",
                    height: "380px",
                    margin: '-10px 0px ',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',

                  },
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  margin: '30px 0',
                }}>
                  <Typography

                    sx={{
                      fontSize: 50,
                      "@media (max-width:600px)": {
                        fontSize: "1rem",
                        display: 'flex',
                        margin: "0px 10px 5px 10px",
                        alignItems: 'center',
                        flexDirection: 'column',
                      },

                    }} >{weather.name}</Typography>
                  <Typography>{weather.sys.country}</Typography>
                  <Box sx={{
                    fontSize: '10rem',
                    "@media (max-width:600px)": {
                      margin: '-10px 0px ',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },
                  }}>
                    {iconChanger(weather.weather[0].main)}
                  </Box  >
                  <Typography sx={{
                    fontSize: 50,
                    "@media (max-width:600px)": {
                      fontSize: "2rem",
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },
                  }}>{weather.main.temp.toFixed(0)}</Typography>
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
                  "@media (max-width:600px)": {
                    width: "280px",
                    height: "190px",
                    margin: '10px 0px 50px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  },
                }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 20px',
                    "@media (max-width:600px)": {
                      width: "300px",
                      height: "200px",
                      margin: '10px 0px -100px',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },

                    // Adjust units as needed (px, rem, etc.)
                  }}>
                    <WaterDropIcon sx={{
                      fontSize: '2rem', marginRight: '10px',
                      "@media (max-width:600px)": {
                        // fontSize:"2rem",  
                        ml: 2,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      },

                    }} />
                    <Box sx={{
                      "@media (max-width:600px)": {
                        fontSize: "2rem",
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      },
                    }}>
                      <Typography>{weather.main.humidity}%</Typography>
                      <Typography>Humidity</Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 30px', // Adjust units as needed (px, rem, etc.)
                    "@media (max-width:600px)": {
                      width: "300px",
                      height: "200px",
                      margin: '10px 0px -100px',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },

                  }}>
                    <AirTwoToneIcon sx={{
                      fontSize: '2rem', marginRight: '10px',
                      "@media (max-width:600px)": {
                        // fontSize:"2rem",  
                        ml: 2,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      },
                    }} />
                    <Box
                      sx={{
                        "@media (max-width:600px)": {
                          fontSize: "2rem",

                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                        },
                      }}
                    >
                      {/* <h1>{weatherData.wind.speed}km/h</h1> */}
                      <Typography>{weather.wind.speed}km/h</Typography>
                      <Typography>Wind speed</Typography>
                    </Box>
                  </Box>
                </Box>
              </>
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
        ) : isTablet ? (
          <Box
            sx={{
              width: {
                xs: 600,
                sm: 600,
                lg: 600,
                xl: 600
              },
              ml: 10,
              "@media (min-width:601px) and (max-width:960px)": {
                width: "450px",
                height: "800px",
              },
              backgroundColor: '#80D0EB',
              borderRadius: '12px',
              padding: '5rem',
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-70%, -50%)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', // Adjusted rgba values
              boxSizing: 'border-box',
              color: 'rgba(0, 0, 0, 0.8)', // Consistent color with slight transparency
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}

          >
            <Box sx={{
              marginTop: 1, // Adjust units as needed (px, rem, etc.)
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
            }}>
              <TextField
                sx={{
                  width: 600,
                  "@media (min-width:601px) and (max-width:960px)": {
                    width: 600,
                    // height: "200px",
                    margin: '15px 0px 50px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  },
                }}
                type="text"
                placeholder="Enter city name"

                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <IconButton
                style={styles.iconButton}>
                <SearchIcon
                  sx={{
                    ml: 10,
                    margin: '10px 0px 40px 10px ',
                    width: "50px",
                    height: "50px"
                  }}
                  onClick={handleSearch}
                />
              </IconButton>

            </Box>

            {weather ? (
              <>
                <Box sx={{
                  width: "800px",
                  "@media (min-width:601px) and (max-width:960px)": {
                    width: "300px",
                    height: "380px",
                    margin: '10px 0px ',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',

                  },
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  margin: '30px 0',
                }}>
                  <Typography
                    sx={{
                      fontSize: 50,
                      "@media (min-width:601px) and (max-width:960px)": {
                        fontSize: "2rem",
                        margin: "10px 10px 0px 15px",
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      },

                    }} >{weather.name}</Typography>
                  <Typography>{weather.sys.country}</Typography>
                  <Box sx={{
                    fontSize: '10rem',
                    "@media (min-width:601px) and (max-width:960px)": {
                      // margin: '5px 0px ',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },
                  }}>
                    {iconChanger(weather.weather[0].main)}
                  </Box  >
                  <Typography sx={{
                    fontSize: 50,
                    "@media (min-width:601px) and (max-width:960px)": {
                      fontSize: "2rem",

                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },
                  }}>{weather.main.temp.toFixed(0)}</Typography>
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
                  "@media (min-width:601px) and (max-width:960px)": {
                    width: "280px",
                    height: "190px",
                    margin: '10px 0px 50px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  },
                }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 20px',
                    "@media (min-width:601px) and (max-width:960px)": {
                      width: "300px",
                      height: "200px",
                      margin: '10px 0px -100px',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },

                    // Adjust units as needed (px, rem, etc.)
                  }}>
                    <WaterDropIcon sx={{
                      fontSize: '2rem', marginRight: '10px',
                      "@media (min-width:601px) and (max-width:960px)": {
                        // fontSize:"2rem",  
                        ml: 2,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      },

                    }} />
                    <Box sx={{
                      "@media (min-width:601px) and (max-width:960px)": {
                        fontSize: "2rem",

                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      },
                    }}>
                      <Typography>{weather.main.humidity}%</Typography>
                      <Typography>Humidity</Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 30px', // Adjust units as needed (px, rem, etc.)
                    "@media (min-width:601px) and (max-width:960px)": {
                      width: "300px",
                      height: "200px",
                      margin: '10px 0px -100px',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },

                  }}>
                    <AirTwoToneIcon sx={{
                      fontSize: '2rem', marginRight: '10px',
                      "@media (min-width:601px) and (max-width:960px)": {
                        // fontSize:"2rem",  
                        ml: 2,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      },
                    }} />
                    <Box
                      sx={{
                        "@media (min-width:601px) and (max-width:960px)": {
                          fontSize: "2rem",

                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                        },
                      }}
                    >
                      {/* <h1>{weatherData.wind.speed}km/h</h1> */}
                      <Typography>{weather.wind.speed}km/h</Typography>
                      <Typography>Wind speed</Typography>
                    </Box>
                  </Box>
                </Box>
              </>
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
        ) : isDesktop ? (
          <Box
            sx={{
              width: {
                xs: 600,
                sm: 400,
                lg: 500,
                xl: 600
              },
              ml: 10,
              "@media (min-width:961px)": {
                width: "600px",
                height: "800px",
              },
              backgroundColor: '#80D0EB',
              borderRadius: '12px',
              padding: '5rem',
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translate(-70%, -50%)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', // Adjusted rgba values
              boxSizing: 'border-box',
              color: 'rgba(0, 0, 0, 0.8)', // Consistent color with slight transparency
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}

          >
            <Box sx={{
              marginTop: 1, // Adjust units as needed (px, rem, etc.)
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',

            }}>
              <TextField
                sx={{
                  width: 300,
                  "@media ((min-width:961px)": {
                    width: "600px",
                    height: "800px",
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  },
                }}
                type="text"
                placeholder="Enter city name"

                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <IconButton
                style={styles.iconButton}
              >
                <SearchIcon
                  sx={{
                    ml: "20px",
                    width: "50px",
                    height: "50px"
                  }}

                  onClick={handleSearch}
                />
              </IconButton>

            </Box>

            {weather ? (
              <>
                <Box sx={{

                  width: "600px",
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  margin: '30px 0',
                }}>
                  <Typography

                    sx={{
                      fontSize: 50,
                    }} >{weather.name}</Typography>
                  <Typography>{weather.sys.country}</Typography>
                  <Box sx={{

                    fontSize: '10rem',

                  }}>
                    {iconChanger(weather.weather[0].main)}
                  </Box  >
                  <Typography sx={{
                    fontSize: 50,

                  }}>{weather.main.temp.toFixed(0)}</Typography>
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
                    margin: '0 20px',
                  }}>
                    <WaterDropIcon sx={{
                      fontSize: '2rem', marginRight: '10px',

                    }} />
                    <Box sx={{
                    }}>
                      <Typography>{weather.main.humidity}%</Typography>
                      <Typography>Humidity</Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 30px', // Adjust units as needed (px, rem, etc.)

                  }}>
                    <AirTwoToneIcon sx={{
                      fontSize: '2rem', marginRight: '10px',

                    }} />
                    <Box

                    >
                      {/* <h1>{weatherData.wind.speed}km/h</h1> */}
                      <Typography>{weather.wind.speed}km/h</Typography>
                      <Typography>Wind speed</Typography>
                    </Box>
                  </Box>
                </Box>
              </>
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
        ) : (
          <Box
            sx={{
              ml: 10,
              backgroundColor: '#F8BBD0',
              borderRadius: '12px',
              padding: '5rem',
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translate(-70%, -50%)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', // Adjusted rgba values
              boxSizing: 'border-box',
              color: 'rgba(0, 0, 0, 0.8)', // Consistent color with slight transparency
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}

          >
            <Box sx={{
              marginTop: 1, // Adjust units as needed (px, rem, etc.)
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
            }}>
              <TextField
                sx={{
                  width: 300,
                  "@media ((min-width:961px)": {
                    width: 300,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  },
                }}
                type="text"
                placeholder="Enter city name"

                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SearchIcon
                style={styles.iconButton}
                aria-label="Search"

                onClick={handleSearch}
              />
            </Box>

            {weather ? (
              <>
                <Box sx={{
                  width: "600px",
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  margin: '30px 0',
                }}>
                  <Typography

                    sx={{
                      fontSize: 50,
                    }} >{weather.name}</Typography>
                  <Typography>{weather.sys.country}</Typography>
                  <Box sx={{

                    fontSize: '10rem',

                  }}>
                    {iconChanger(weather.weather[0].main)}
                  </Box  >
                  <Typography sx={{
                    fontSize: 50,

                  }}>{weather.main.temp.toFixed(0)}</Typography>
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
                    margin: '0 20px',
                  }}>
                    <WaterDropIcon sx={{
                      fontSize: '2rem', marginRight: '10px',

                    }} />
                    <Box sx={{
                    }}>
                      <Typography>{weather.main.humidity}%</Typography>
                      <Typography>Humidity</Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 30px', // Adjust units as needed (px, rem, etc.)

                  }}>
                    <AirTwoToneIcon sx={{
                      fontSize: '2rem', marginRight: '10px',

                    }} />
                    <Box

                    >
                      {/* <h1>{weatherData.wind.speed}km/h</h1> */}
                      <Typography>{weather.wind.speed}km/h</Typography>
                      <Typography>Wind speed</Typography>
                    </Box>
                  </Box>
                </Box>
              </>
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
        )
      }

    </CustomMainConatiner>
  );
};

export default DisplayWeather;