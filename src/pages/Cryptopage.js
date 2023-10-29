import React from 'react'
import Coinstable from '../components/Coinstable'
import { useCurrency } from '../context/context';
import Drawer from '../components/sidebar/Drawer';
import Card from '../components/sidebar/Card';
import {Accordion, AccordionItem} from "@nextui-org/react";
import Footer from '../components/Footer';
import Bannerforcryptopage from '../components/Bannerforcryptopage';
import Topmovers from '../components/Topmovers';

export default function Cryptopage() {
  
    const columns = [
        {name: "Coin", uid: "coin"},
        {name: "Price", uid: "price"},
        {name: "24h change", uid: "24h_change"},
        {name: "Market cap", uid: "marketCap"}
      ];

      const {currency, symbol, user, watchlist, setAlert, setIsOpen, isOpen} = useCurrency();
    
  return (
    
    <div className='text-white mb-5 bg-[#061121]'>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card />
      </Drawer>

      <Bannerforcryptopage />

      <Topmovers />

      <Coinstable 
      columns={columns}
      />


      <Footer />
    </div>
  )
}
