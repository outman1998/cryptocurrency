import React from 'react'
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { makeStyles } from "@material-ui/core";

export default function Rootpage() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: '#e93a45',
    }
  }));
  
  const classes = useStyles();


  return (
    <div className={classes.App}>
    <Navigation />
    <main>
        <Outlet />
    </main>
    </div>
  )
}
