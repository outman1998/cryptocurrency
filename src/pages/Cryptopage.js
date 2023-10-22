import React from 'react'
import Coinstable from '../components/Coinstable'

export default function Cryptopage() {

    const columns = [
        {name: "Coin", uid: "coin"},
        {name: "Price", uid: "price"},
        {name: "24h change", uid: "24h_change"},
        {name: "Market cap", uid: "marketCap"}
      ];
    
  return (
    <div>
        <Coinstable 
        columns={columns}
        />
    </div>
  )
}
