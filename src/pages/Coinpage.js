import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useCurrency} from '../context/context';
import axios from 'axios';
import {SingleCoin} from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from '../components/Carousel';
import { Button } from '@nextui-org/react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Drawer from '../components/sidebar/Drawer';
import Card from '../components/sidebar/Card';

export default function Coinpage() {

  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol, user, watchlist, setAlert, setIsOpen, isOpen} = useCurrency();

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

  if (!coin) return <div style={{backgroundColor: 'gold'}} />

  const inWatchList = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {

    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
        });
        setAlert({
          open: true,
          message: `${coin.name} added to the watchlist!`,
          type: 'succes'
        })
    } catch(error) {
      console.log(error);
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  const removeFromWatchlist = async () => {

    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef, 
        {
        coins: watchlist.filter((watchlist) => watchlist !== coin?.id),
        },
        {merge: "true"}
        );

        setAlert({
          open: true,
          message: `${coin.name} removed from the watchlist!`,
          type: 'succes'
        });
    } catch(error) {
      console.log(error);
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }

  }

  return (
    <div className="lg:flex md:items-center" style={{color: 'white'}}>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card />
      </Drawer>

      <div className="md:w-full mt-10 flex flex-col items-center border-r-2 border-gray-400">
        <img 
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        className='h-[120px] lg:h-[200px] mb-5'
        />
        <div 
        variant="h3" 
        className="font-bold text-4xl lg:text-6xl mb-5 font-montserrat">
          {coin?.name}
        </div>
        <div variant="subtitle1" className="w-full font-montserrat text-justify px-5 text-md lg:text-lg overflow-auto">
          {coin?.description.en.split(". ")[0]}.
        </div>

        <div className="self-start pt-5 w-full md:flex md:justify-around sm:flex-col sm:items-center md:items-center lg:items-start xs:items-start">
          <span style={{display: 'flex'}}>
            <div className="font-bold pl-5 mb-5 text-md lg:text-xl font-montserrat">
              Rank:
            </div>
            &nbsp; &nbsp;
            <div className='text-lg lg:text-2xl' style={{fontFamily: 'Montserrat'}}>
              {numberWithCommas(coin?.market_cap_rank)}
            </div>
          </span>

          <span style={{display: 'flex'}}>
            <div variant='h5' className="font-bold mb-5 font-montserrat pl-5 text-md lg:text-xl">
              Current Price:
            </div>
            &nbsp; &nbsp;
            <div 
              variant='h5' 
              className=' text-lg lg:text-2xl'
              style={{fontFamily: 'Montserrat'}}
            >     
            {symbol + ' '}          
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </div>
          </span>

          <span style={{ display: "flex" }}>
            <div 
            variant="h5" 
            className="font-bold mb-7 font-montserrat pl-5 text-md lg:text-xl">
              Market Cap:
            </div>
            &nbsp; &nbsp;
            <div
              variant="h5"
              className='text-lg lg:text-2xl'
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

        {
        user && 
        <Button 
        onClick={ inWatchList ? removeFromWatchlist : addToWatchlist} 
        className={`w-[94%] rounded mb-5 ${inWatchList ? 'bg-red-500' : 'bg-[#ffd600]'}`}
        size='lg'> 
        {inWatchList ? "Remove from watchlist" : "Add to watchlist"} 
        </Button>
        }

      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}
