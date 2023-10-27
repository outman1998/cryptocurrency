import React from 'react';
import Carousel from './Carousel';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Fade } from "react-awesome-reveal";

const url = 'https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg';

export default function Banner() {
  return (
    <div style={{ backgroundImage: `url(${url})` }} className='py-24'>
      <div className="h-400 flex flex-col justify-between text-white">
        <div className="flex mx-3 h-40% flex-col justify-center items-center lg:mx-20 lg:text-center">
          <div>
            <Fade bottom>
              <h1 className='font-bold mb-15 font-montserrat text-[40px] lg:text-6xl lg:mx-48'>Get all the info regarding your favorite crypto currency</h1>
            </Fade>
          </div>
          <div>
            <Fade bottom delay={300}>
              <p className='text-darkgrey font-montserrat text-2xl lg:text-2xl mt-7 w-full font-semibold'>Buy Bitcoin, Ethereum, and all your favorite crypto</p>
            </Fade>
          </div>
          <div className=''>
            <Fade bottom delay={600}>
              <div className='flex text-lg items-baseline mt-5 lg:mx-20'>
                <p className='text-blue-500'>{<AiFillCheckCircle />}</p>
                <p className=' ml-1'>Trusted by more than <span className='text-[#ffd600]'>80M users</span> world-wide</p>
              </div>
            </Fade>
            <Fade bottom delay={900}>
              <div className='flex text-lg items-baseline lg:mx-20'>
                <p className='text-blue-500'>{<AiFillCheckCircle />}</p>
                <p className='ml-1'>Leader in <span className='text-[#ffd600]'>regulatory compliance</span> and <span className='text-[#ffd600]'>security certifications</span></p>
              </div>
            </Fade>
            <Fade bottom delay={1200}>
              <div className='flex text-lg items-baseline lg:mx-20'>
                <p className='text-blue-500'>{<AiFillCheckCircle />}</p>
                <p className='ml-1'>The industry’s most comprehensive <span className='text-[#ffd600]'>insurance coverage</span> and <span className='text-[#ffd600]'>verified proof of reserves</span></p>
              </div>
            </Fade>
          </div>
        </div>
        <Carousel />
      </div>
    </div>
  );
}
