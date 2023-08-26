import React, { useEffect, useState } from 'react';
import {CoinList} from '../config/api';
import {useCurrency} from '../context/context';
import axios from 'axios';
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from "@material-ui/core";
import {useNavigate} from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

export default function Coinstable() {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const {currency, symbol} = useCurrency();
    const navigate = useNavigate();

    const fetchCoins =  async() => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency)).then(res => {
          const data = res.data;
          setCoins(data);
          setLoading(false);
        });
    };

    // kalder den her når komponenten oprettes første gang og hver gang currency ændrer sig. 
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    console.log(coins);

    const handleSearch = () => {
      return coins.filter((coin) => 
        coin.name.toLowerCase().includes(search) || 
        coin.symbol.toLowerCase().includes(search)
      )
    }

    const tableHeader =["coin", "price", "24h change", "market cap"];

    // const useStyles = makeStyles(() => {

    // })

    // const classes = useStyles();

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
                        align={row === "coin" ? " " :  "right"}
                        >
                        {row}
                      </TableCell>
                    )})}
                  </TableRow>
                 </TableHead>

                  <TableBody>
                    {handleSearch().map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    })}
                  </TableBody>

                  {/* <TableBody>
                    {handleSearch().map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow 
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}>
                          <TableCell 
                          component="th" 
                          scope='row'
                          style={{
                            display: 'flex',
                            gap: 15
                          }}>
                          </TableCell>
                        </TableRow>
                      )

                    })}
                  </TableBody> */}

                </Table>
              )
            }
          </TableContainer>
        </Container>

    </ThemeProvider>
  )
}