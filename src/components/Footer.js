import React from 'react'
import {Divider} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {AiOutlinePlus} from "react-icons/ai";

export default function Footer() {
  return (
    <div className='pb-5'>

<div className='px-5 py-20 lg:flex bg-[#0b1426]'>

<div className='lg:w-1/3 lg:mr-20 mb-5 lg:mb-0'>
  <p className='text-3xl font-bold'>Frequently asked questions</p>
</div>
<div className='lg:w-1/2'>

<Accordion  
className='p-0'
variant="bordered" 
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
  <AccordionItem indicator={<AiOutlinePlus className="text-white text-xl font-bold" />} className='text-white border-b-1 border-white' key="1" aria-label="Accordion 1" title={<div className="text-white font-bold text-xl lg:text-2xl">What is crypto?</div>}>
  Cryptocurrency is a digital or virtual currency that operates on distributed ledger technology called a blockchain and uses cryptography for security. It is decentralized and operates independently of a central bank.
  Unlike traditional currencies, cryptocurrencies are not backed by a physical commodity or government, and their value is determined by market demand and supply. Cryptocurrencies can be used to buy goods and services, transfer funds, and trade in markets. Popular cryptocurrencies include Bitcoin, Ethereum, Litecoin, Ripple, and Cronos.
  <br></br><br></br>
  Many cryptocurrencies, like Bitcoin, are created through a process called mining, which involves solving complex mathematical equations to validate and record transactions on a blockchain. This mechanism is also called Proof of Work (PoW). Another consensus mechanism that has increased in popularity — as it is more energy efficient — is Proof of Stake (PoS). Instead of mining, PoS relies on network participants validating transactions. Ethereum, the second-largest cryptocurrency, uses this consensus mechanism.
  </AccordionItem>
  <AccordionItem indicator={<AiOutlinePlus className="text-white text-xl font-bold" />} className='text-white border-b-1 border-white' key="2" aria-label="Accordion 2" title={<div className="text-white font-bold lg:text-2xl text-xl ">How to buy crypto?</div>}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </AccordionItem>
  <AccordionItem indicator={<AiOutlinePlus className="text-white text-xl font-bold" />} className='text-white border-b-1 border-white' key="3" aria-label="Accordion 3" title={<div className="text-white font-bold lg:text-2xl text-xl ">What is bitcoin?</div>}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </AccordionItem>
  <AccordionItem indicator={<AiOutlinePlus className="text-white text-xl font-bold" />} className='text-white border-b-1 border-white' key="4" aria-label="Accordion 4" title={<div className="text-white font-bold lg:text-2xl text-xl ">What is NFT?</div>}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </AccordionItem>
  <AccordionItem indicator={<AiOutlinePlus className="text-white text-xl font-bold" />} className='text-white border-b-1 border-white' key="5" aria-label="Accordion 5" title={<div className="text-white font-bold lg:text-2xl text-xl ">How to but NFT's?</div>}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </AccordionItem>
  <AccordionItem indicator={<AiOutlinePlus className="text-white text-xl font-bold" />} className='text-white border-b-1 border-white' key="6" aria-label="Accordion 6" title={<div className="text-white font-bold lg:text-2xl text-xl ">How to start trading in Cryptohunter</div>}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </AccordionItem>
</Accordion>

<p className='mt-3 text-md'>Have more questions? <span className='text-[#ffd600] font-semibold'>Contact Us</span></p>

</div>

</div>

    <Divider className="pb-5 text-white" />
    <div className='px-5 footer text-center lg:flex justify-center lg:justify-between text-sm'>  

        <div className='mb-2 lg:mb-0'>
        <p>Copyright © 2023 Cryptohunter.com. All rights reserved.</p>
        </div>

        <div className=''>
        <ul className='flex justify-between'>
            <li className='mr-5'>Privacy Notice</li>
            <li className='mr-5'>Status</li>
            <li>Cookie Preferences</li>
        </ul>
        </div>
        
    </div>  

    </div>

  )
}
