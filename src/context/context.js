import React, {useContext, createContext, useState} from 'react';

const ctx = createContext();

export default function Context({children}) {

    const [currency, setCurrency] = useState('DKK');


  return (
    <ctx.Provider value={{currency, setCurrency}}>
        {children}
    </ctx.Provider>
  )
}

export const useCurrency = () => {
    return useContext(ctx);
  }