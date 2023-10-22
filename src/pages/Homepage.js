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
import Footer from '../components/Footer';
import { TbZoomMoney } from 'react-icons/tb';
import {useNavigate} from 'react-router-dom';





export default function Homepage() {

  const navigate = useNavigate();

  const sendToCryptoPage = () => {
    console.log("hej"); 
    navigate('Cryptopage')
  }

  const columns = [
    {name: "Coin", uid: "coin"},
    {name: "Price", uid: "price"},
    {name: "24h change", uid: "24h_change"},
    {name: "Market cap", uid: "marketCap"}
  ];

  return (
    <div className='mb-5 text-white'>
      <Banner />

    <div className='bg-sky-950'>
      <div className=' px-2 text-center pt-20'>
        <p className='text-[#ffd600] lg:text-lg font-bold'>Cryptohunter.com</p>
        <p className='text-4xl lg:text-6xl text-center lg:mx-52 font-bold'>Buy Bitcoin, Ethereum and 98+ cryptocurrencies</p>
        <Button 
        size='lg' 
        className='mt-5 text-white bg-sky-950 border-2 border-sky-800 font-semibold text-xl px-12'
        onClick={sendToCryptoPage}
        >
          Check crypto prices 
          <TbZoomMoney /> 
        </Button>
      </div>
      <Trending />
    </div>

    <div className='bg-sky-900 py-20'>

        <p className='text-3xl lg:text-5xl text-center lg:mx-20 font-bold mb-10'>Your crypto journey starts here</p>

        <div className='lg:flex lg:space-x-4 md:mx-40'>

          <div className='lg:w-1/2'>

            <div className='bg-sky-950 h-60 rounded-2xl mx-5 p-4 relative'>
              <div className='w-1/2 flex flex-col justify-center h-48'>
                <p className='text-[#ffd600] font-bold text-2xl'>Buy crypto</p>
                <p className='text-xl font-bold'>Buy BTC, ETH, and other crypto easily via bank transfer.</p>
              </div>
              <img src={img} style={{ height: "200px" }} className='absolute bottom-0 right-6' />
            </div>

            <div className='bg-sky-950 rounded-2xl mx-5 my-5 p-4'>
              <p className='text-[#ffd600] font-bold text-2xl'>Price alerts</p>
              <p className='font-bold text-xl mb-5'>Be notified on BTC, ETH, XRP prices, and more.</p>
              <PriceAlertsTable />
            </div>

          </div>

          <div className='lg:w-1/2 h-full'>

            <div className='lg:row-span-3 bg-sky-950 rounded-2xl mx-5 p-4 pb-0'>
              <div className='mb-16'>
                <p className='text-[#ffd600] font-bold text-2xl'>Recurring Buy</p>
                <p className='text-xl font-bold'>Grow your portfolio automatically with daily, weekly, or monthly trades.</p>
              </div>
              <img src={img1} style={{ height: "350px" }} className='mx-auto' />
            </div>

          </div>

        </div>
    </div>



      <div className='mx-5 my-20 lg:flex'>

        <div className='lg:w-1/3 lg:mr-20 mb-5 lg:mb-0'>
          <p className='text-3xl font-bold'>Frequently asked questions</p>
        </div>
        <div className='lg:w-1/2'>

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
          <AccordionItem className='text-white' key="1" aria-label="Accordion 1" title={<div className="text-white font-bold">What is crypto?</div>}>
          Cryptocurrency is a digital or virtual currency that operates on distributed ledger technology called a blockchain and uses cryptography for security. It is decentralized and operates independently of a central bank.
          Unlike traditional currencies, cryptocurrencies are not backed by a physical commodity or government, and their value is determined by market demand and supply. Cryptocurrencies can be used to buy goods and services, transfer funds, and trade in markets. Popular cryptocurrencies include Bitcoin, Ethereum, Litecoin, Ripple, and Cronos.
          <br></br><br></br>
          Many cryptocurrencies, like Bitcoin, are created through a process called mining, which involves solving complex mathematical equations to validate and record transactions on a blockchain. This mechanism is also called Proof of Work (PoW). Another consensus mechanism that has increased in popularity — as it is more energy efficient — is Proof of Stake (PoS). Instead of mining, PoS relies on network participants validating transactions. Ethereum, the second-largest cryptocurrency, uses this consensus mechanism.
          </AccordionItem>
          <AccordionItem className='text-white' key="2" aria-label="Accordion 2" title={<div className="text-white font-bold">How to buy crypto?</div>}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionItem>
          <AccordionItem className='text-white' key="3" aria-label="Accordion 3" title={<div className="text-white font-bold">How to trade crypto?</div>}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionItem>
        </Accordion>
        <p className='mt-3'>Have more questions? <span className='text-[#ffd600] font-semibold'>Contact Us</span></p>
        </div>

      </div>


      <Footer />

      {/* <Coinstable
      columns={columns}
      /> */}
    </div>
  )
}
