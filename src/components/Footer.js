import React from 'react'
import {Divider} from "@nextui-org/react";

export default function Footer() {
  return (
    <div className=''>

    <Divider className="mb-5" />
    <div className='footer text-center lg:flex justify-center lg:justify-between text-sm'>  

        <div>
        <p>Copyright © 2023 Cryptohunter.com. All rights reserved.</p>
        </div>

        <div className=''>
        <ul className='flex justify-between'>
            <li className='mr-5'>Privacy Notice</li>
            <li className='mr-5'>Status</li>
            <li>Cookie Preferences</li>
        </ul>
        </div>
        
    </div>  

    </div>

  )
}
