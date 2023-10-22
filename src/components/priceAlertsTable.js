import React, { useEffect, useState } from 'react'
import {useCurrency} from '../context/context';
import axios from 'axios';
import {TrendingCoins} from '../config/api';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import {numberWithCommas} from './Carousel';
import {useNavigate} from 'react-router-dom';

export default function PriceAlertsTable() {

    const [trending, setTrending] = useState([]);
    const {currency, symbol} = useCurrency();
    const navigate = useNavigate();

    // kalder den her når komponenten oprettes første gang og hver gang currency ændrer sig. 
    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
            console.log(trending);
        } catch(error) {
            console.log(error);
            console.log("fejl!!");
        }
    };

    useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const renderCell = React.useCallback((coin, columnKey) => {
        const cellValue = coin[columnKey];
        let result = coin.id.charAt(0).toUpperCase() + coin.id.slice(1);
        switch (columnKey) {
          case "coin":
            return (
                <>
                <p className='font-bold'> {result} </p>
                <p className='font-light'>{coin.symbol.toUpperCase()}</p>
                </>
            );
          case "price":
            const profit = coin?.price_change_percentage_24h >= 0;

            return (
                <div>
                    <p className="text-bold text-small capitalize">
                    {symbol + ' '} {numberWithCommas(coin.current_price.toFixed(2))}
                    </p>   
                    <span style={{color: profit > 0 ? "rgb(255, 214, 1)" : "red"}}>{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}% 
                    </span> 
                </div>        
                );
          default:
            return cellValue;
        }
      }, [symbol]);

      const columns = [
        {name: "Coin", uid: "coin"},
        {name: "Price", uid: "price"},
      ];

  return (
    <div className='overflow-x-auto'>
        <Table removeWrapper hideHeader className='m-auto'>
      <TableHeader  columns={columns}>
      {(column) => (
              <TableColumn className='text-black bg-[#ffd600] text-sm lg:text-lg' key={column.uid}>
                {column.name}
              </TableColumn>
            )}
      </TableHeader>
      <TableBody items={trending.slice(5,10)}>
        {(coin) => (
            <TableRow                 
            onClick={() => navigate(`/coins/${coin.id}`)}
            className='border-b-1 flex justify-between border-sky-800 cursor-pointer' key={coin.id}>
            {(columnKey) => <TableCell className='px-0'>{renderCell(coin, columnKey)}</TableCell>}
            </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  )
}
