import './App.css';

// import Error404 from './components/Error404';
// import { Link, Route, Routes } from 'react-router-dom'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, {useEffect, useState} from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import SideNav from "./components/SideNav";
import NavBar from './components/NavBar';
import InboxIcon from "@mui/icons-material/Inbox";
import { CssBaseline, ThemeProvider } from '@mui/material'; 
import { ColorModeContext, useMode } from './styles/theme';

// reset all default css


import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from '@mui/material';


const navArrayLinks = [
  {
    title: "Home",
    path: "/",
    icon: <InboxIcon />,
  }
  
];


function App() {

  const [theme, coloMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={coloMode}>
      <ThemeProvider theme={theme}>
        {/* Rest CSS */}
        <CssBaseline />

         <BrowserRouter>
         <NavBar navArrayLinks={navArrayLinks} />
         <Container>

        <Routes>
          <Route path="/" element={<Home />} >
            


            
          </Route>  
               
        </Routes>
        </Container>
        </BrowserRouter> 
        </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  );
}




/*
function App() {
  return (
    <div>
   <SideNav/>
   </div>
    
    <>
      <h1>BLAMSH Dashboard</h1>
      <div className='totales'>
        <div className='result'><TotalProducts /></div>
        <div className='result'><TotalUsers /></div>
        <div className='result'><TotalCategory /></div>
      </div>
        <LastProductDetail/>
        <TotalCategoryCU/>
    </>
  )
}*/

export default App;
