import React from 'react'
import {Avatar} from "@nextui-org/react";
import { useCurrency } from '../../context/context';

export default function UserSidebar({ children, isOpen, setIsOpen }) {

  const {user} = useCurrency();

  return (
    <>
    <Avatar 
    onClick={() => setIsOpen(true)}
    src={user?.photoURL}
    className='cursor-pointer' 
    alt={user?.displayName || user?.email}
    />
    </>
  )
}
