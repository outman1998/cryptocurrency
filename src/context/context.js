import React, {useContext, createContext, useState, useEffect} from 'react';

const ctx = createContext();

export default function Context({children}) {

    const [currency, setCurrency] = useState('DKK');
    const [symbol, setSymbol] = useState('KR');

    useEffect(() => {
      if (currency === "DKK") setSymbol("KR");
      else if (currency === "USD") setSymbol("$");
    }, [currency]);


  return (
    <ctx.Provider value={{currency, setCurrency, symbol, setSymbol}}>
        {children}
    </ctx.Provider>
  )
}

export const useCurrency = () => {
    return useContext(ctx);
  }