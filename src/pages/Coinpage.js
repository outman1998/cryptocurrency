import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useCurrency} from '../context/context';
import axios from 'axios';
import {SingleCoin} from '../config/api';
// import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from '../components/Carousel';


// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     [theme.breakpoints.down("md")]: {
//       flexDirection: "column",
//       alignItems: "center",
//     },
//   },
//   sidebar: {
//     width: "30%",
//     [theme.breakpoints.down("md")]: {
//       width: "100%",
//     },
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: 25,
//     borderRight: "2px solid grey",
//   },
//   heading: {
//     fontWeight: "bold",
//     marginBottom: 20,
//     fontFamily: "Montserrat",
//   },
//   description: {
//     width: "100%",
//     fontFamily: "Montserrat",
//     padding: 25,
//     paddingBottom: 15,
//     paddingTop: 0,
//     textAlign: "justify",
//   },
//   marketData: {
//     alignSelf: "start",
//     padding: 25,
//     paddingTop: 10,
//     width: "100%",
//     [theme.breakpoints.down("md")]: {
//       display: "flex",
//       justifyContent: "space-around",
//     },
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     [theme.breakpoints.down("xs")]: {
//       alignItems: "start",
//     },
//   },
// }));

export default function Coinpage() {

  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol} = useCurrency();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch(error) {
      console.log(error);
      console.log("fejl i coinpage!!!");
    }

  };

  useEffect(() => {
    fetchCoin();
  }, []);

  console.log(coin);

  // const classes = useStyles();

  if (!coin) return <div style={{backgroundColor: 'gold'}} />

  return (
    <div className="" style={{color: 'white'}}>
      <div className="">
        <img 
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{marginBottom: 20}} 
        />
        <div 
        variant="h3" 
        className="">
          {coin?.name}
        </div>
        <div variant="subtitle1" className="">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </div>

        <div className="">
          <span style={{display: 'flex'}}>
            <div variant='h5' className="">
              Rank:
            </div>
            &nbsp; &nbsp;
            <div variant='h5' style={{fontFamily: 'Montserrat'}}>
              {numberWithCommas(coin?.market_cap_rank)}
            </div>
          </span>

          <span style={{display: 'flex'}}>
            <div variant='h5' className="">
              Current Price:
            </div>
            &nbsp; &nbsp;
            <div 
              variant='h5' 
              style={{fontFamily: 'Montserrat'}}
            >     
            {symbol + ' '}          
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </div>
          </span>

          <span style={{ display: "flex" }}>
            <div 
            variant="h5" 
            className="">
              Market Cap:
            </div>
            &nbsp; &nbsp;
            <div
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol + ' '}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </div>
          </span>
        </div>

      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}
