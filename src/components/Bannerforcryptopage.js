import React from 'react';
import Carousel from './Carousel';
import { AiFillCheckCircle } from 'react-icons/ai';

const url = 'https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg';


export default function Bannerforcryptopage() {

  return (
    <div style={{backgroundImage: `url(${url})`}} className='py-24'>

      <div className="h-400 flex flex-col justify-between text-white">

        <div className="flex mx-3 h-40% flex-col justify-center items-center lg:mx-20 lg:text-center">

            <h1 className='font-bold mb-15 font-montserrat text-[40px] lg:text-6xl lg:mx-48'>Get the most out of your money, safely</h1>
            <p className='text-darkgrey font-montserrat text-2xl lg:text-2xl mt-7 w-full font-semibold'>Invest in Bitcoin, Ethereum, and your favorite digital assets, your way.</p>

          <div className=''>
            <div className='flex text-lg items-baseline mt-5 lg:mx-20'>
              <p className='text-blue-500'>{<AiFillCheckCircle />}</p>
              <p className=' ml-1'> <span className='text-[#ffd600]'>Crypto made simple:</span> Whether new or experienced, we cater to all investors.</p>
            </div>

            <div className='flex text-lg items-baseline lg:mx-20'>
              <p className='text-blue-500'>{<AiFillCheckCircle />}</p>
              <p className='ml-1'>Leader in <span className='text-[#ffd600]'>regulatory compliance</span> and <span className='text-[#ffd600]'>security certifications</span></p>
            </div>

            <div className='flex text-lg items-baseline lg:mx-20'>
              <p className='text-blue-500'>{<AiFillCheckCircle />}</p>
              <p className='ml-1'>Be part of the ever-evolving <span className='text-[#ffd600]'>digital financial landscape</span>. Invest wisely and embrace the crypto revolution today.</p>
            </div>
          </div>

        </div>

        <Carousel />

      </div>
        
    </div>
  )
}
