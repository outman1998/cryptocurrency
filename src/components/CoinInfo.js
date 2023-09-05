import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { useCurrency } from '../context/context';
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

export default function CoinInfo({coin}) {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const {currency} = useCurrency();

  const fetchData = async () => {
    try {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricData(data.prices);
    } catch(error) {
        console.log(error);
        console.log("fejl!!");
    }

  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const useStyles = makeStyles(() => {

  })

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* chart */}

        {/* button */}
      </div>
    </ThemeProvider>
    )
}
