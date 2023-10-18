import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useCurrency} from '../context/context';
import axios from 'axios';
import {SingleCoin} from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from '../components/Carousel';
// import ReactHtmlParser from "react-html-parser";

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

  if (!coin) return <div style={{backgroundColor: 'gold'}} />

  return (
    <div className="lg:flex md:items-center" style={{color: 'white'}}>
      <div className="md:w-full mt-5 flex flex-col items-center border-r-2 border-gray-400">
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
        <div variant="subtitle1" className="w-full font-montserrat text-justify px-5 text-md lg:text-lg">
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
            className="font-bold mb-20 font-montserrat pl-5 text-md lg:text-xl">
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

      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}
