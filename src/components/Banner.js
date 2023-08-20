import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Banner2 from '../banner2.jpg'

const url = 'https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg';


const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: `url(${url})`,
      },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
        color: 'white'
      },
      tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      },
}))

export default function Banner() {

    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant="h2"
                style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "Montserrat",
                }}
                >Crypto Hunter
                </Typography>
                <Typography
                variant="subtitle2"
                style={{
                    color: "darkgrey",
                    textTransform: 'capitalize',
                    fontFamily: "Montserrat",
                }}
                >Get all the Info regarding your favorite Crypto Currency
                </Typography>
            </div>
        </Container>
        
    </div>
  )
}
