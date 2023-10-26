import React, {useContext, createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { CoinList } from '../config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setUser(user);
        } 
        else {
          setUser(null)
        } 
        console.log(user.email);
      })
    }, []);

    useEffect(() => {

      if(user) {
        const coinRef = doc(db, "watchlist", user.uid);
        const unsubscribe = onSnapshot(coinRef, coin=> {
          if(coin.exists()) {
            setWatchlist(coin.data().coins);
          } else {
            console.log("No items in watchlist");
          }
        });
        return () => {
          unsubscribe();
        }
      }

    }, [user])

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
      isOpen,
      watchlist
    }}>
      {children}
    </ctx.Provider>
  )
}

export const useCurrency = () => {
    return useContext(ctx);
  }