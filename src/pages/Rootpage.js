import React from 'react'
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
// import { createTheme, ThemeProvider } from "@material-ui/core";

// const darkTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#fff',
//     },
//     type: 'dark',
//   },
// });

export default function Rootpage() {
  
  return (
    <>
    <Navigation />
    <main>
        <Outlet />
    </main>
    </>
  )
}
