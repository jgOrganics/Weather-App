import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";

export const CustomMainConatiner =styled(Box)`
height: "100vh",
background: "transparency",
`;

export const CustomContainer=styled(Box)`
 marginTop: 1, // Adjust units as needed (px, rem, etc.)
 display: 'flex',
 justifyContent: 'space-evenly',
 alignItems: 'center',
 width: '100%',
`;


export const CustomizableTextField= styled(TextField)`
width: 300,
"@media (max-width:600px)": {
  width: 300,

  // height: "200px",
  // margin: '10px 0px 50px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
},
`;

