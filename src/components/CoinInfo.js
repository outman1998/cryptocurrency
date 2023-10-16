import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { useCurrency } from '../context/context';
import {Line} from 'react-chartjs-2';
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import Chart from 'chart.js/auto';

export default function CoinInfo({coin}) {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const {currency} = useCurrency();
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
      <div className="px-5 mb-5 lg:mb-0">
        
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
            <div className='flex mt-10 w-full justify-between'>
              {chartDays.map((day) => (
                <div className='div w-[23%]'
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  <div className='border-1 rounded border-[#cfb52b] border-solid border-gold cursor-pointer text-center font-semibold p-2 w-full'>{day.label}</div>
                </div>
              ))}
            </div>
          </>
          }
          
        

      </div>
    </>
    )
}
