import React, { useEffect, useState } from 'react';
import {CoinList} from '../config/api';
import {useCurrency} from '../context/context';
import axios from 'axios';
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from "@material-ui/core";
import {useNavigate} from 'react-router-dom';
import {numberWithCommas} from './Carousel';
import { Pagination } from '@material-ui/lab';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});


export default function Coinstable() {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const {currency, symbol} = useCurrency();
    const navigate = useNavigate();
    const classes = useStyles();

    const [page, setPage] = useState(1);


    // kalder den her når komponenten oprettes første gang og hver gang currency ændrer sig. 
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      console.log(data);
  
      setCoins(data);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
      return coins.filter((coin) => 
        coin.name.toLowerCase().includes(search) || 
        coin.symbol.toLowerCase().includes(search)
      )
    }

    const tableHeader =["coin", "price", "24h change", "market cap"];


  return (
    <ThemeProvider theme={darkTheme}>

        <Container style={{textAlign: 'center'}}>
          <Typography
          variant='h4'
          style={{margin: 18, fontFamily: 'Montserrat', color: 'white'}}
          >Cryptocurrency prices by market cap
          </Typography>

          <TextField label="Search for a Crypto currency" variant='outlined'
          style={{marginBottom: 20, width: "100%"}}
          onChange={(e) => {
            setSearch(e.target.value)
          }} 
          />

          <TableContainer>
            {
              loading ? (
                <LinearProgress 
                style={{backgroundColor: 'gold'}} /> 
              ) : (
                <Table>

                 <TableHead style={{backgroundColor: '#EEBC1D'}}>
                  <TableRow>
                    {tableHeader.map((row) => {
                      return (
                      <TableCell 
                        style={{
                          color: 'black',
                          fontWeight: '700',
                          fontFamily: 'Montserrat',
                        }}
                        key={row}
                        align={row === "coin" ? "inherit" :  "right"}
                        >
                        {row}
                      </TableCell>
                    )})}
                  </TableRow>
                 </TableHead>

                  <TableBody>
                    {handleSearch()
                    .slice((page -1) * 10, (page-1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow 
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                        className={classes.row}
                        >
                          <TableCell 
                          component="th" 
                          scope='row'
                          style={{
                            display: 'flex',
                            gap: 15
                          }}>
                            <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{marginBottom: 10}}
                            />
                            <div style={{display: 'flex', flexDirection: "column"}}>
                              <span
                              style={{textTransform: 'uppercase', fontSize: 22}}
                              >
                                {row.symbol}
                              </span>
                              <span style={{color: 'darkgrey'}}>{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell
                          align='right'
                          >
                            {symbol} 
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                          align='right'
                          style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red', fontWeight: 500
                          }}
                          >
                            {profit && '+'}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align='right'>
                            {symbol} {' '}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      )

                    })}
                  </TableBody>

                </Table>
              )
            }
          </TableContainer>

          <Pagination 
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
          classes={{ ul: classes.pagination }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          />
        </Container>

    </ThemeProvider>
  )
}
