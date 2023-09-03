import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useCurrency} from '../context/context';
import axios from 'axios';
import {SingleCoin} from '../config/api';
import { makeStyles } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';

export default function Coinpage() {

  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency} = useCurrency();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch(error) {
      console.log(error);
      console.log("fejl i coinpage!!!");
    }

  };

  useEffect(() => {
    fetchCoin();
  }, []);

  console.log(coin);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <CoinInfo />
    </div>
  )
}
