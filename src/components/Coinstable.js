import React, { useEffect, useState } from 'react';
import {CoinList} from '../config/api';
import {useCurrency} from '../context/context';
import axios from 'axios';
import { Container, createTheme, LinearProgress, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from "@material-ui/core";

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


    const fetchCoins =  async() => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    // kalder den her når komponenten oprettes første gang og hver gang currency ændrer sig. 
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    console.log(coins);


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
                      {["coin", "price", "24h change", "market cap"].map((head) => {
                        <TableCell
                        style={{
                          color: 'black',
                          fontWeight: '700',
                          fontFamily: 'Montserrat',
                        }}
                        key={head}
                        align={head === "coin" ? " " :  "right"}
                        >
                          {head}
                        </TableCell>
                      })}
                 
                      
                    </TableRow>
                  </TableHead>

                </Table>
              )
            }

          </TableContainer>
        </Container>

    </ThemeProvider>
  )
}
