import React, {useContext, createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { CoinList } from '../config/api';

const ctx = createContext();

export default function Context({children}) {

    const [currency, setCurrency] = useState('DKK');
    const [symbol, setSymbol] = useState('KR');
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trending, setTrending] = useState([]);

    const fetchCoins = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
      } catch(error) {
        console.log(error); 
        console.log("fejl!!"); 
      }
    };

    useEffect(() => {
      if (currency === "DKK") setSymbol("KR");
      else if (currency === "USD") setSymbol("$");
    }, [currency]);


  return (
    <ctx.Provider value={{currency, setCurrency, symbol, setSymbol, coins, setCoins, loading, setLoading, trending, setTrending, fetchCoins}}>
        {children}
    </ctx.Provider>
  )
}

export const useCurrency = () => {
    return useContext(ctx);
  }