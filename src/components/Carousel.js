import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import {useCurrency} from '../context/context';
import {TrendingCoins} from '../config/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center'
      },
      carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      }
}));


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Carousel() {

    const [trending, setTrending] = useState([]);
    const classes = useStyles();
    const {currency, symbol} = useCurrency();


    // kalder den her når komponenten oprettes første gang og hver gang currency ændrer sig. 
    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
        } catch(error) {
            console.log(error);
            console.log("fejl!!");
        }

      };
    
      useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currency]);

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4
        }
    };

    const items = trending.map((coin) => {

        const profit = coin?.price_change_percentage_24h >= 0;

        return (
            <Link 
            className={classes.carouselItem}
            to={`/coins/${coin.id}`}>
                <img 
                src={coin?.image} 
                alt={coin.name}
                height="80"
                style={{marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    <br></br>
                    <span style={{color: profit > 0 ? "rgb(12, 203, 129)" : "red"}}>{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}% </span>
                </span>

                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

  return (
    <div className={classes.carousel}>
        <AliceCarousel 
        mouseTracking 
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
        />
    </div>
  )
}
