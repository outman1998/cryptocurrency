import React from 'react'
import {Avatar} from "@nextui-org/react";

export default function UserSidebar({ children, isOpen, setIsOpen }) {
  return (
    <>
    <Avatar 
    onClick={() => setIsOpen(true)}
    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    className='cursor-pointer' 
    />
    </>
  )
}
