import React from 'react';
import Banner from '../components/Banner';
import Coinstable from '../components/Coinstable';
import { Button } from '@nextui-org/react';
import Carousel from '../components/Carousel';
import Trending from '../components/Trending';

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
        <p className='text-3xl text-center font-bold'>Buy Bitcoin, Ethereum and 98+ cryptocurrencies</p>
        <Button size='lg' className='mt-5 text-white bg-sky-950 border-2 border-sky-800'>Check crypto prices</Button>
      </div>

      <Trending />
      {/* <Coinstable
      columns={columns}
      /> */}
    </div>
  )
}
