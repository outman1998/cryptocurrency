import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useCurrency} from '../context/context';
import {Select, SelectItem, Link} from "@nextui-org/react";
import Auth from './Authentication/Auth';
import UserSidebar from './Authentication/UserSidebar';

export default function Navigation(props) {

  const [value, setValue] = React.useState(new Set([]));

  const handleSelectionChange = (e) => {
    // setValue(new Set([e.target.value]));
    setCurrency(e.target.value)
  };

  const navigate = useNavigate();
    
  function redirectToHome() {
    navigate('/')
  }

  const {currency, setCurrency, user, setIsOpen} = useCurrency();

  const currencies = [
    {label: "DKK", value: "DKK"},
    {label: "USD", value: "USD"}
  ];


  return (
    <div className='flex justify-between items-center px-5 py-3 shadow-lg bg-[#061121] '>
      
      <h1>
        <Link onClick={redirectToHome} className='text-white font-bold text-md sm:text-lg md:text-2xl cursor-pointer'>cryptoHunter</Link>
      </h1>

      <div className='flex items-center'>
        <Select
          color='#0b1426'
          size='sm'
          label="Currency"
          placeholder={currency}
          // selectedKeys={value}
          className="w-24 text-[#0b1426] mr-3"
          onChange={handleSelectionChange}
        >
          {currencies.map((currency) => (
            <SelectItem key={currency.value} value={currency.value}>
              {currency.label}
            </SelectItem>
          ))}
        </Select>
      
        {user ? <UserSidebar setIsOpen={setIsOpen} /> : <Auth /> }
      </div>

    </div>
  )

}