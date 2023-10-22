import React, { useEffect, useState } from 'react'
import {useCurrency} from '../context/context';
import axios from 'axios';
import {TrendingCoins} from '../config/api';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Progress} from "@nextui-org/react";
import {numberWithCommas} from './Carousel';
import {useNavigate} from 'react-router-dom';

export default function Trending() {

    const [trending, setTrending] = useState([]);
    const {currency, symbol} = useCurrency();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // kalder den her når komponenten oprettes første gang og hver gang currency ændrer sig. 
    const fetchTrendingCoins = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
            setLoading(false);
        } catch(error) {
            console.log(error);
            console.log("fejl!!");
            setLoading(true);
            
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
    <>
    {!loading ? (
    <div className='my-10 mx-5 overflow-x-auto'>
        <Table removeWrapper hideHeader className='lg:w-3/4 m-auto'>
      <TableHeader  columns={columns}>
      {(column) => (
              <TableColumn className='text-black bg-[#ffd600] text-sm lg:text-lg' key={column.uid}>
                {column.name}
              </TableColumn>
            )}
      </TableHeader>
      <TableBody items={trending.slice(0,5)}>
        {(coin, indes, isLast) => (
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
    ) :
    <div className='flex justify-center my-5'>
    <Progress
      size="sm"
      isIndeterminate
      label="Loading trending coins..."
      aria-label="Loading..."
      className="max-w-md text-white"
      classNames={{
        indicator: "bg-[#cfb52b]",
      }}
    />
  </div>}
    </>
  )
}
