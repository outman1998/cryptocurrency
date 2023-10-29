import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useCurrency } from '../context/context';
import {numberWithCommas} from './Carousel';
import {Progress} from "@nextui-org/react";

export default function TopMovers() {

    const {trending, symbol} = useCurrency();

    console.log(trending);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      
  return (
    <div className=''>

        <h1 className='text-3xl m-auto mx-5 font-bold text-white mt-10 mb-5'>
            Top Movers
        </h1>
        {trending.length <= 0 &&       
        <div className='flex justify-center'>
        <Progress
          isIndeterminate
          label="Loading top movers..."
          aria-label="Loading..."
          className="max-w-md text-white"
          classNames={{
            indicator: "bg-[#cfb52b]",
          }}
        />
      </div>}
        {trending.length > 0 && 
        <Carousel 
        className='mx-4' 
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        >
            {trending.map((coin) => {
            const percentageChange = coin?.price_change_percentage_24h;
                return (
                    <div className='bg-[#0b1426] mx-2 rounded-lg p-2'>
                        <img width={"40px"} src={coin.image} />
                        <div className='flex mt-2'>
                        <p className='text-xl mr-1'> {coin.name} </p>
                        <p className='text-sm text-gray-300'> {coin.symbol} </p>
                        </div>
                        <div className='flex justify-between mt-2'>
                            <p> {symbol + ' '} {numberWithCommas(coin.current_price.toFixed(2))} </p>
                            <p className={`text-lg text-right ${percentageChange < 0 ? 'text-red-500' : 'text-yellow-400'}`}>
                            <span>{percentageChange >= 0 ? '+' : ''} {percentageChange?.toFixed(2)}%</span>
                            </p> 
                        </div>

                    </div>
                )
            })}
        </Carousel>}
    

    </div>
  )
}
