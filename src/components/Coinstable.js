import React, { useEffect, useState } from 'react';
import {CoinList} from '../config/api';
import {useCurrency} from '../context/context';
import axios from 'axios';



export default function Coinstable() {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const {currency, symbol} = useCurrency();


    const fetchCoins =  async() => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    // kalder den her når komponenten oprettes første gang og hver gang currency ændrer sig. 
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    console.log(coins);


  return (
    <div>coinstable</div>
  )
}
