import React from 'react';
import Banner from '../components/Banner';
import Coinstable from '../components/Coinstable';

const columns = [
  {name: "Coin", uid: "coin"},
  {name: "Price", uid: "price"},
  {name: "24h change", uid: "24h_change"},
  {name: "Market cap", uid: "marketCap"}
];

export default function Homepage() {
  return (
    <>
    <Banner />
    <Coinstable
    columns={columns}
    />
    </>
  )
}
