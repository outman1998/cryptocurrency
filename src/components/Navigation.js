import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Container, MenuItem, Select, Typography, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: 'gold',
      fontFamily: 'montserrat',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '22px',
    }
  }));

export default function Navigation() {
    
    const classes = useStyles();

    const navigate = useNavigate();
    
    function redirectToHome() {
      navigate('/')
    }


  return (
    <AppBar style={{
      backgroundColor: '#14161a', 
      padding: '10px 0px'
      }} 
      position="static">
        <Container>
            <toolbar style={{
              justifyContent: 'center', 
              display: 'flex',
              alignItems: 'center',
              }}>
                <Typography onClick={redirectToHome} className={classes.title}>Crypto Hunter</Typography>

                <Select 
                  variant="outlined" 
                  defaultValue={'DKK'}
                  style={{
                    width: 100, 
                    height: 40, 
                    marginRight: 15,
                  }}
                >
                  <MenuItem value={'DKK'}>DKK</MenuItem>
                  <MenuItem value={'USD'}>USD</MenuItem>
                </Select>
            </toolbar>
        </Container>
    </AppBar>

  )

}