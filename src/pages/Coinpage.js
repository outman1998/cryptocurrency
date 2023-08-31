import React, { useEffect, useState } from 'react'
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
  const {data} = await axios.get(SingleCoin(id));
  setCoin(data);
  }

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles(() => {
    
  });

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {/* {sidebar} */}
      </div>

      {/* {chart} */}
      <CoinInfo coin={coin} />
    </div>
  )
}
