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
    <div className='flex bg-sky-950	justify-between items-center px-5 py-3 shadow-lg'>
      
      <h1>
        <Link onClick={redirectToHome} className='text-[#ffd600] font-bold text-2xl'>cryptoHunter</Link>
      </h1>

      <div className='flex items-center'>
        <Select
          variant="bordered"
          color='black'
          size='sm'
          label="Currency"
          placeholder={currency}
          // selectedKeys={value}
          className="w-28 text-white mr-3"
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