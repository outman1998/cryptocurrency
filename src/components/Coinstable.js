import React, { useEffect, useState } from 'react';
import {CoinList} from '../config/api';
import {useCurrency} from '../context/context';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {numberWithCommas} from './Carousel';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, User, Pagination, Progress} from "@nextui-org/react";

export default function Coinstable() {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const {currency, symbol} = useCurrency();
    const navigate = useNavigate();

    const INITIAL_VISIBLE_COLUMNS = ["coin", "price", "24h_change", "marketCap"];

    const columns = [
      {name: "ID", uid: "id", sortable: true},
      {name: "Coin", uid: "coin", sortable: true},
      {name: "Name", uid: "name", sortable: true},
      {name: "Symbol", uid: "symbol", sortable: true},
      {name: "Price", uid: "price"},
      {name: "24h change", uid: "24h_change"},
      {name: "Market cap", uid: "marketCap", sortable: true}
    ];

    const statusOptions = [
      {name: "Active", uid: "active"},
      {name: "Paused", uid: "paused"},
      {name: "Vacation", uid: "vacation"},
    ];

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return columns;
  
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

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


    const renderCell = React.useCallback((user, columnKey) => {

      const cellValue = user[columnKey];
      const profit = user.price_change_percentage_24h > 0;

      switch (columnKey) {
        case "coin":
          return (
            <User
              avatarProps={{src: user.image}}
              description={user.symbol}
              name={user.name}
            >
              {user.name}
            </User>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
              {symbol + ' '} {numberWithCommas(user.current_price.toFixed(2))}
              </p>
            </div>
          );
        case "24h_change":
          return (
            <p>
              {profit && '+'} {user.price_change_percentage_24h.toFixed(2)}%
            </p>
          );
        case "marketCap":
          return (
            <p>
              {symbol + ' '} {numberWithCommas(user.market_cap.toString().slice(0, -6))}
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
        <div className='flex justify-end'>
        <Input
              isClearable
              className="w-full sm:max-w-[44%]"
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
            onChange={(page) => setPage(page)}
          />
        </div>
      );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className='m-5'>
      {
      loading ?
      <>
      <p className='text-center text-3xl mb-5'>Cryptocurrency Prices by Market Cap </p>
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
        <p className='text-center text-3xl mb-5'>Cryptocurrency Prices by Market Cap </p>
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          selectedKeys={selectedKeys}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.uid}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No coins found"} items={coins}>
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
