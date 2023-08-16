import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Container, MenuItem, Select, Typography, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    title: {
        color: '#e93a45',
        fontSize: '55px'
    }
  }));

export default function Navigation() {
    
    const classes = useStyles();


  return (
    <AppBar color="inherit">
        <Container>
            <toolbar>
                <Typography className={classes.title}>Crypto Hunter</Typography>

                <Select variant="outlined" style={{width: 100, height: 40, marginLeft: 15}}>
                  <MenuItem value={'USD'}>USD</MenuItem>
                  <MenuItem value={'DKK'}>DKK</MenuItem>
                </Select>
            </toolbar>
        </Container>
    </AppBar>

  )

}