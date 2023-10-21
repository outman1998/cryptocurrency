import React from 'react';
import Banner from '../components/Banner';
import Coinstable from '../components/Coinstable';
import { Button } from '@nextui-org/react';
import Carousel from '../components/Carousel';
import Trending from '../components/Trending';
import img from '../buy-bitcoin-ab4b1b0a1cecbb6b0f4a163fe9570327 (1).webp';
import img1 from '../recurring-buy-84d43a9e3d7cc0459af94e6b63fc130c.webp';
import PriceAlertsTable from '../components/priceAlertsTable';
import {Accordion, AccordionItem} from "@nextui-org/react";


const columns = [
  {name: "Coin", uid: "coin"},
  {name: "Price", uid: "price"},
  {name: "24h change", uid: "24h_change"},
  {name: "Market cap", uid: "marketCap"}
];

export default function Homepage() {
  return (
    <div className='mb-10 text-white'>
      <Banner />

      <div className=' px-2 text-center mt-20'>
        <p className='text-[#ffd600] font-bold'>Cryptohunter.com</p>
        <p className='text-3xl lg:text-5xl text-center lg:mx-52 font-bold'>Buy Bitcoin, Ethereum and 98+ cryptocurrencies</p>
        <Button size='lg' className='mt-5 text-white bg-sky-950 border-2 border-sky-800 font-bold text-xl px-12'>Check crypto prices</Button>
      </div>

      <Trending />

      <p className='text-3xl lg:text-5xl text-center lg:mx-20 font-bold mb-10'>Your crypto journey starts here</p>

    <div className='lg:flex lg:space-x-4 mb-20'>

      <div className='lg:w-1/2'>

        <div className='bg-sky-900 h-60 rounded-2xl mx-5 p-4 relative'>
          <div className='w-1/3 flex flex-col justify-center h-48'>
            <p className='text-[#ffd600] font-bold text-2xl'>Buy crypto</p>
            <p className='text-sky-950 text-xl font-bold'>Buy BTC, ETH, and other crypto easily via bank transfer.</p>
          </div>
          <img src={img} style={{ height: "200px" }} className='absolute bottom-0 right-6' />
        </div>

        <div className='bg-sky-900 rounded-2xl mx-5 my-5 p-4'>
          <p className='text-[#ffd600] font-bold text-2xl'>Price alerts</p>
          <p className='font-bold text-xl mb-5'>Be notified on BTC, ETH, XRP prices, and more.</p>
          <PriceAlertsTable />
        </div>

      </div>

      <div className='lg:w-1/2 h-full'>

        <div className='lg:row-span-3 bg-sky-900 rounded-2xl mx-5 p-4 pb-0'>
          <div className='mb-16'>
            <p className='text-[#ffd600] font-bold text-2xl'>Recurring Buy</p>
            <p className='text-sky-950 text-xl font-bold'>Grow your portfolio automatically with daily, weekly, or monthly trades.</p>
          </div>
          <img src={img1} style={{ height: "350px" }} className='mx-auto' />
        </div>

      </div>

    </div>



      <div className='mx-5 lg:flex'>
        <div className='w-1/2 mr-20'>
          <p className='text-3xl font-bold'>Frequently Asked Questions</p>
        </div>
        <Accordion  
        variant="shadow" 
        className='bg-sky-900'
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              height: "auto",
              transition: {
                height: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 1,
                },
                opacity: {
                  easings: "ease",
                  duration: 1,
                },
              },
            },
            exit: {
              y: -10,
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  easings: "ease",
                  duration: 0.25,
                },
                opacity: {
                  easings: "ease",
                  duration: 0.3,
                },
              },
            },
          },
        }}
        >
          <AccordionItem className='text-white' key="1" aria-label="Accordion 1" title="What is crypto?">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionItem>
          <AccordionItem className='text-white' key="2" aria-label="Accordion 2" title="How to buy crypto?">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionItem>
          <AccordionItem className='text-white' key="3" aria-label="Accordion 3" title="How to trade crypto?">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionItem>
        </Accordion>
      </div>


      {/* <Coinstable
      columns={columns}
      /> */}
    </div>
  )
}
