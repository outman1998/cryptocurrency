import React, { useEffect, useState } from 'react'
import {useCurrency} from '../context/context';
import axios from 'axios';
import {TrendingCoins} from '../config/api';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Progress} from "@nextui-org/react";
import {numberWithCommas} from './Carousel';
import {useNavigate} from 'react-router-dom';

export default function Trending() {

    const {currency, symbol, trending, setTrending, user} = useCurrency();
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
                <p className='font-bold text-md lg:text-2xl'> {result} </p>
                <p className='font-light'>{coin.symbol.toUpperCase()}</p>
                </>
            );
          case "price":
            return (
                <p className="text-bold text-md lg:text-2xl capitalize">
                {symbol + ' '} {numberWithCommas(coin.current_price.toFixed(2))}
                </p>            
                );
                case "24h_change":
                  const percentageChange = coin?.price_change_percentage_24h;
                
                  return (
                    <p className={`text-2xl ${percentageChange < 0 ? 'text-red-500' : 'text-yellow-400'}`}>
                      <span>{percentageChange >= 0 ? '+' : ''} {percentageChange?.toFixed(2)}%</span>
                    </p>
                  );
                
        case "marketCap":
            return (
                <p className={`text-md lg:text-2xl}`}>
                {symbol + ' '} {numberWithCommas(coin.market_cap.toString().slice(0, -6))}
                </p>            
            );
            case "actions":
              return user ? (
                <Button
                  className='bg-[#ffd600] rounded-lg'
                  onClick={() => navigate(`/coins/${coin.id}`)}
                >
                  View
                </Button>
              ) : <Button className='bg-white px-2 lg:px-8 rounded-3xl'>Trade</Button>;
            default:
              return cellValue;
        }
      }, [symbol]);

    const renderCellForSmallScreen = React.useCallback((coin, columnKey) => {
      const cellValue = coin[columnKey];
      let result = coin.id.charAt(0).toUpperCase() + coin.id.slice(1);
      switch (columnKey) {
        case "coin":
          return (
              <>
              <p className='font-bold text-lg'> {result} </p>
              <p className='font-light'>{coin.symbol.toUpperCase()}</p>
              </>
          );  
          case "actions":
            const percentageChange = coin?.price_change_percentage_24h;

            return (
              <div className='flex items-center justify-end '>
                <div className='mr-2'>
                  <p className="text-bold text-lg  capitalize">
                  {symbol + ' '} {numberWithCommas(coin.current_price.toFixed(2))}
                  </p> 
                  <p className={`text-lg text-right ${percentageChange < 0 ? 'text-red-500' : 'text-yellow-400'}`}>
                  <span>{percentageChange >= 0 ? '+' : ''} {percentageChange?.toFixed(2)}%</span>
                  </p> 
                </div>
              <div>
                <Button
                  className='bg-white rounded-3xl font-bold text-lg'
                  onClick={() => navigate(`/coins/${coin.id}`)}
                >
                  View
                </Button>
              </div>
            </div>  
            )
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

      const columnsForSmallScreen = [
        {name: "Coin", uid: "coin"},
        {name: "actions", uid: "actions"}
      ];

  return (
    <>
    {!loading ? (
      <div>
        <div className='py-10 hidden md:block px-5 overflow-x-auto bg-[#061121]'>
          <Table aria-label="Example  static collection table" removeWrapper hideHeader className='lg:w-3/4 m-auto'>
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
                  className='border-b-1 border-[#0b1426] cursor-pointer hover:bg-[#0b1426]' 
                  key={coin.id}
                  >
                  {(columnKey) => <TableCell>{renderCell(coin, columnKey)}</TableCell>}
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className='py-10 px-5 md:hidden'>
          <Table aria-label="Example  static collection table" removeWrapper hideHeader className='lg:w-3/4 m-auto'>
              <TableHeader  columns={columnsForSmallScreen}>
              {(column) => (
                      <TableColumn className='text-black bg-[#ffd600] text-sm lg:text-lg' key={column.uid}>
                        {column.name}
                      </TableColumn>
                    )}
              </TableHeader>
              <TableBody items={trending.slice(0,5)}>
                {(coin, indes, isLast) => (
                    <TableRow 
                    className='border-b-1 border-[#ffffff2b] cursor-pointer hover:bg-[#0b1426]' 
                    key={coin.id}
                    >
                    {(columnKey) => <TableCell>{renderCellForSmallScreen(coin, columnKey)}</TableCell>}
                    </TableRow>
                )}
              </TableBody>
          </Table>
        </div>
      </div>

    ) :
    <div className='pt-10 px-5 flex justify-center bg-[#061121]'>
    <Progress
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
