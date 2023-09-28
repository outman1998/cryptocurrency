import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useCurrency} from '../context/context';
import {Select, SelectItem} from "@nextui-org/react";

export default function Navigation() {

  const [value, setValue] = React.useState(new Set([]));

  const handleSelectionChange = (e) => {
    setValue(new Set([e.target.value]));
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
    <div className='flex justify-between items-center mx-5 my-3'>
      
      <h1 className='text-[#ffd600] font-bold text-2xl'>Cryptohunter</h1>

      <Select
        variant="bordered"
        label="Currency"
        selectedKeys={value}
        className="w-28"
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