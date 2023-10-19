import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useCurrency} from '../context/context';
import {Select, SelectItem, Link} from "@nextui-org/react";

export default function Navigation() {

  const [value, setValue] = React.useState(new Set([]));

  const handleSelectionChange = (e) => {
    // setValue(new Set([e.target.value]));
    setCurrency(e.target.value)
  };

  const navigate = useNavigate();
    
  function redirectToHome() {
    navigate('/')
  }

  const {currency, setCurrency} = useCurrency();

  console.log(currency);

  const currencies = [
    {label: "DKK", value: "DKK"},
    {label: "USD", value: "USD"}
  ];


  return (
    <div className='flex bg-sky-950	justify-between items-center px-5 py-3 shadow-lg'>
      
      <h1>
        <Link href='/' className='text-[#ffd600] font-bold text-2xl'>cryptoHunter</Link>
      </h1>

      <Select
        variant="bordered"
        color='black'
        size='sm'
        label="Currency"
        placeholder={currency}
        // selectedKeys={value}
        className="w-28 text-white"
        onChange={handleSelectionChange}
      >
        {currencies.map((currency) => (
          <SelectItem key={currency.value} value={currency.value}>
            {currency.label}
          </SelectItem>
        ))}
      </Select>
      
    </div>
  )

}