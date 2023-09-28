import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { useCurrency } from '../context/context';
// import { CircularProgress, createTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import {Line} from 'react-chartjs-2';
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import Chart from 'chart.js/auto';

// const darkTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#fff',
//     },
//     type: 'dark',
//   },
// });

// const useStyles = makeStyles((theme) => ({    
//   container: {
//   width: "75%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   marginTop: 25,
//   padding: 40,
//   [theme.breakpoints.down("md")]: {
//     width: "100%",
//     marginTop: 0,
//     padding: 20,
//     paddingTop: 0,
//   },
// },
// }));

export default function CoinInfo({coin}) {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const {currency, symbol} = useCurrency();
  const [flag,setflag] = useState(false);


  const fetchData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
      setflag(true);
    } catch(error) {
        console.log(error);
        console.log("fejl!!");
    }

  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  // const classes = useStyles();

  return (
    <>
      <div className="">
        
          {!historicData ? (
            // <CircularProgress
            // style={{color: 'gold'}}
            // size="250"
            // thickness={1}
            // />
            <p>ingen data</p>
          ) :
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]), 
                    label: `Price (past ${days} Days) in ${currency}`,
                    borderColor: '#EEBC1D'
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
          }
          
        

      </div>
    </>
    )
}
