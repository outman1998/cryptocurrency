import React from 'react'
import Coinstable from '../components/Coinstable'
import { useCurrency } from '../context/context';
import Drawer from '../components/sidebar/Drawer';
import Card from '../components/sidebar/Card';


export default function Cryptopage() {
  
    const columns = [
        {name: "Coin", uid: "coin"},
        {name: "Price", uid: "price"},
        {name: "24h change", uid: "24h_change"},
        {name: "Market cap", uid: "marketCap"}
      ];

      const {currency, symbol, user, watchlist, setAlert, setIsOpen, isOpen} = useCurrency();
    
  return (
    
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card />
      </Drawer>
        <Coinstable 
        columns={columns}
        />
    </div>
  )
}
