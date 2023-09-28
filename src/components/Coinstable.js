import React, { useEffect, useState } from 'react';
import {CoinList} from '../config/api';
import {useCurrency} from '../context/context';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {numberWithCommas} from './Carousel';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, User, Pagination, Progress} from "@nextui-org/react";

export default function Coinstable(props) {

    const [filterValue, setFilterValue] = useState("");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const {currency, symbol} = useCurrency();
    const navigate = useNavigate();

    /* for the table */
    const INITIAL_VISIBLE_COLUMNS = ["coin", "price", "24h_change", "marketCap"];
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    // set page to show 20 coins/rows
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // set the page to be first
    const [page, setPage] = React.useState(1);
    const [sortDescriptor, setSortDescriptor] = React.useState({
      column: "age",
      direction: "ascending",
    });

    const hasSearchFilter = Boolean(filterValue);

    const statusOptions = [
      {name: "Active", uid: "active"},
      {name: "Paused", uid: "paused"},
      {name: "Vacation", uid: "vacation"},
    ];

    const filteredItems = React.useMemo(() => {
      let filteredUsers = [...coins];
  
      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((coin) =>
        coin.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredUsers = filteredUsers.filter((coin) =>
          Array.from(statusFilter).includes(coin.status),
        );
      }
  
      return filteredUsers;
    }, [coins, filterValue, statusFilter]);

    const pages = Math.ceil(coins.length / rowsPerPage);

    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((coin, columnKey) => {

      const cellValue = coin[columnKey];
      const profit = coin.price_change_percentage_24h > 0;

      switch (columnKey) {
        case "coin":
          return (
            <User
              avatarProps={{src: coin.image}}
              description={coin.symbol}
              name={coin.name}
            >
              {coin.name}
            </User>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
              {symbol + ' '} {numberWithCommas(coin.current_price.toFixed(2))}
              </p>
            </div>
          );
        case "24h_change":
          return (
            <p>
              {profit && '+'}{coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          );
        case "marketCap":
          return (
            <p>
              {symbol + ' '} {numberWithCommas(coin.market_cap.toString().slice(0, -6))}
             </p>
          );
        default:
          return cellValue;
      }

    }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[]);

    // kalder den her når komponenten oprettes første gang og hver gang currency ændrer sig. 
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch(error) {
        console.log(error); 
        console.log("fejl!!"); 
      }
    };
  
    useEffect(() => {
      fetchCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const topContent = React.useMemo(() => {
      return (
        <>
        <div className='flex justify-center'>
        <Input
              isClearable
              className="w-full"
              size='lg'
              placeholder="Search by name..."
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
        </div>

          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total: {coins.length} coins</span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </>
      );
    }, [
      filterValue,
      statusFilter,
      visibleColumns,
      onRowsPerPageChange,
      coins.length,
      onSearchChange,
      hasSearchFilter,
    ]);
  
    const bottomContent = React.useMemo(() => {
      return (
        <div className='flex justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className='mx-32 my-10'>
      {
      loading ?
      <>
      <p className='text-center text-3xl mb-5'>Cryptocurrency prices by market cap </p>
      <div className='flex justify-center'>
        <Progress
          size="sm"
          isIndeterminate
          label="Loading all coins..."
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
      </>
      :
      <>
        <p className='text-center text-3xl mb-5'>Cryptocurrency prices by market cap </p>
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          selectedKeys={selectedKeys}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={props.columns}>
            {(column) => (
              <TableColumn className='text-black text-lg' key={column.uid}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No coins found"} items={sortedItems}>
            {(coin) => (
              <TableRow 
              onClick={() => navigate(`/coins/${coin.id}`)}
              key={coin.id}
              >
                {(columnKey) => <TableCell>{renderCell(coin, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    }
    </div>
  )
}
