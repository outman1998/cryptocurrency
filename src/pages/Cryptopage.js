import React from 'react'
import Coinstable from '../components/Coinstable'
import { useCurrency } from '../context/context';
import Drawer from '../components/sidebar/Drawer';
import Card from '../components/sidebar/Card';
import {Accordion, AccordionItem} from "@nextui-org/react";
import Footer from '../components/Footer';

export default function Cryptopage() {
  
    const columns = [
        {name: "Coin", uid: "coin"},
        {name: "Price", uid: "price"},
        {name: "24h change", uid: "24h_change"},
        {name: "Market cap", uid: "marketCap"}
      ];

      const {currency, symbol, user, watchlist, setAlert, setIsOpen, isOpen} = useCurrency();
    
  return (
    
    <div className='text-white mb-5'>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card />
      </Drawer>

        <Coinstable 
        columns={columns}
        />

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
    </div>
  )
}
