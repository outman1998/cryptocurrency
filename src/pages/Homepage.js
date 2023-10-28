import React, {useState, useEffect} from 'react';
import Banner from '../components/Banner';
import Coinstable from '../components/Coinstable';
import { Button } from '@nextui-org/react';
import Carousel from '../components/Carousel';
import Trending from '../components/Trending';
import img from '../images/recurring-buy-84d43a9e3d7cc0459af94e6b63fc130c.webp'
import img1 from '../images/buy-bitcoin-ab4b1b0a1cecbb6b0f4a163fe9570327 (1).webp';
import PriceAlertsTable from '../components/priceAlertsTable';
import {Accordion, AccordionItem} from "@nextui-org/react";
import Footer from '../components/Footer';
import { TbZoomMoney } from 'react-icons/tb';
import {useNavigate} from 'react-router-dom';
import Drawer from '../components/sidebar/Drawer';
import Card from '../components/sidebar/Card';
import { useCurrency } from '../context/context';
import { Fade } from "react-awesome-reveal";

export default function Homepage() {

  const {setIsOpen, isOpen} = useCurrency();
  const navigate = useNavigate();

  const sendToCryptoPage = () => {
    navigate('Cryptopage')
  }

  const columns = [
    {name: "Coin", uid: "coin"},
    {name: "Price", uid: "price"},
    {name: "24h change", uid: "24h_change"},
    {name: "Market cap", uid: "marketCap"}
  ];

  return (
    <div className='text-white bg-[#061121]'>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card />
      </Drawer>

      <Banner />

        <div className='bg-[#061121] px-2 text-center pt-20'>

        <Fade bottom>
          <p className={'text-[#ffd600] uppercase lg:text-lg font-bold tracking-widest'}>
            Cryptohunter.com EXCHANGE
          </p>
        </Fade>

        <Fade bottom delay={300}>
          <p className={`text-4xl lg:text-6xl text-center lg:mx-52 font-bold`}>
            Buy Bitcoin, Ethereum and 98+ cryptocurrencies
          </p>
        </Fade>

        <Fade bottom delay={600}>
          <Button
            size='lg'
            className='mt-5 text-white bg-[#061121] border-1 border-white font-semibold text-xl px-12 rounded-3xl'
            onClick={sendToCryptoPage}
          >
            Check all crypto prices
            <TbZoomMoney />
          </Button>
        </Fade>

        </div>
        <Fade bottom delay={600}>
        <Trending />
        </Fade>

      <div className='bg-[#061121] py-20'>
          <Fade bottom delay={600}>
            <p className='text-3xl lg:text-5xl text-center lg:mx-20 font-bold mb-10'>Your crypto journey starts here</p>
          </Fade>

          <div className='lg:flex lg:space-x-4 md:mx-40' style={{ height: '100%'}}>
            <div className='lg:w-1/2'>
              <div style={{ background: 'radial-gradient(123.14% 44.41% at 77.00% 45.58%, rgba(17, 153, 250, 0.20) 0%, rgba(17, 153, 250, 0.00) 100%), radial-gradient(172.02% 136.06% at 4.78% 96.68%, rgba(1, 1, 24, 0.40) 0%, rgba(1, 1, 24, 0.00) 100%), #002F61' }} className='h-60 rounded-2xl mx-5 p-4 relative'>
                <div className='w-1/2 pr-[20px] md:pr-0 flex flex-col justify-center h-48'>
                  <p className='text-[#ffd600] font-bold text-2xl'>Buy crypto</p>
                  <p className='text-xl font-bold'>Buy BTC, ETH, and other crypto easily via bank transfer.</p>
                </div>
                <img src={img1} style={{ height: "200px" }} className='absolute bottom-0 right-6' />
              </div>

              <div style={{ background: 'radial-gradient(123.14% 44.41% at 77.00% 45.58%, rgba(17, 153, 250, 0.20) 0%, rgba(17, 153, 250, 0.00) 100%), radial-gradient(172.02% 136.06% at 4.78% 96.68%, rgba(1, 1, 24, 0.40) 0%, rgba(1, 1, 24, 0.00) 100%), #002F61' }} className='rounded-2xl mx-5 my-5 p-4'>
                <p className='text-[#ffd600] font-bold text-2xl'>Price alerts</p>
                <p className='font-bold text-xl mb-5'>Be notified on BTC, ETH, XRP prices, and more.</p>
                <PriceAlertsTable />
              </div>
            </div>

            <div className='lg:w-1/2 h-full'>
              <div style={{ background: 'radial-gradient(123.14% 44.41% at 77.00% 45.58%, rgba(17, 153, 250, 0.20) 0%, rgba(17, 153, 250, 0.00) 100%), radial-gradient(172.02% 136.06% at 4.78% 96.68%, rgba(1, 1, 24, 0.40) 0%, rgba(1, 1, 24, 0.00) 100%), #002F61', height: '100%' }} className='lg:row-span-3 rounded-2xl mx-5 p-4 pb-0'>
                <div className='mb-16'>
                  <p className='text-[#ffd600] font-bold text-2xl'>Recurring Buy</p>
                  <p className='text-xl font-bold'>Grow your portfolio automatically with daily, weekly, or monthly trades.</p>
                </div>
                <img src={img} style={{ height: "350px" }} className='mx-auto' />
              </div>
            </div>
          </div>

      </div>

      <Footer />

    </div>
  )
}
