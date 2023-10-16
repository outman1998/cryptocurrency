import React from 'react';
import Carousel from './Carousel';

const url = 'https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg';


export default function Banner() {

  return (
    <div style={{backgroundImage: `url(${url})`}} className="pt-10 pb-10">
        <div className="h-400 flex flex-col pt-25 justify-between text-white">
            <div className="flex h-40% flex-col justify-center items-center">
                <h1 className='font-bold mb-15 font-montserrat text-7xl'>Crypto Hunter</h1>
                <p className='text-darkgrey font-montserrat mt-5'>Get all the Info regarding your favorite crypto currency</p>
            </div>
            <Carousel />
        </div>
        
    </div>
  )
}
