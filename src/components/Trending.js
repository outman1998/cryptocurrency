import React, { useEffect, useState } from 'react'
import {useCurrency} from '../context/context';
import axios from 'axios';
import {TrendingCoins} from '../config/api';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import {numberWithCommas} from './Carousel';
import {useNavigate} from 'react-router-dom';

export default function Trending() {

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
            return (
                <p className="text-bold text-small capitalize">
                {symbol + ' '} {numberWithCommas(coin.current_price.toFixed(2))}
                </p>            
                );
          case "24h_change":
            const profit = coin?.price_change_percentage_24h >= 0;

            return (
                <p>
                <span style={{color: profit > 0 ? "rgb(255, 214, 1)" : "red"}}>{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}% 
                </span>
                </p>
            );
        case "marketCap":
            return (
                <p>
                {symbol + ' '} {numberWithCommas(coin.market_cap.toString().slice(0, -6))}
                </p>            
            );
          case "actions":
            return (
                <Button  
                className='bg-[#ffd600] rounded-lg'
                onClick={() => navigate(`/coins/${coin.id}`)}
                >
                  View
                </Button>
            );
          default:
            return cellValue;
        }
      }, [symbol]);

      const columns = [
        {name: "Coin", uid: "coin"},
        {name: "Price", uid: "price"},
        {name: "24h change", uid: "24h_change"},
        {name: "Market cap", uid: "marketCap"},
        {name: "actions", uid: "actions"}

      ];

  return (
    <div className='my-10 mx-5 overflow-x-auto'>
        <Table removeWrapper hideHeader className='lg:w-1/2 m-auto'>
      <TableHeader  columns={columns}>
      {(column) => (
              <TableColumn className='text-black bg-[#ffd600] text-sm lg:text-lg' key={column.uid}>
                {column.name}
              </TableColumn>
            )}
      </TableHeader>
      <TableBody items={trending.slice(0,5)}>
        {(coin) => (
            <TableRow 
            className='border-b-1 border-sky-900 cursor-pointer hover:bg-sky-900' 
            key={coin.id}
            >
            {(columnKey) => <TableCell>{renderCell(coin, columnKey)}</TableCell>}
            </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  )
}
