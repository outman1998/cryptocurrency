import React, {useContext, createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { CoinList } from '../config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ctx = createContext();

export default function Context({children}) {

    const [currency, setCurrency] = useState('DKK');
    const [symbol, setSymbol] = useState('KR');
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trending, setTrending] = useState([]);
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
      open: false,
      message: "",
      type: "success"
    });
    //for the drawer
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setUser(user);
        } 
        else {
          setUser(null)
        } 
        console.log(user);
      })
    }, [])

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
    <ctx.Provider value={{
      currency, 
      setCurrency, 
      symbol, 
      setSymbol, 
      coins, 
      setCoins, 
      loading, 
      setLoading, 
      trending, 
      setTrending, 
      fetchCoins, 
      alert, 
      setAlert, 
      user,
      setIsOpen,
      isOpen
    }}>
      {children}
    </ctx.Provider>
  )
}

export const useCurrency = () => {
    return useContext(ctx);
  }