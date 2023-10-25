import React, {useState} from 'react'
import {Input, Button} from "@nextui-org/react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useCurrency } from '../../context/context';

export default function Signup(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const {setAlert, alert} = useCurrency();

  // form handle func for when signup btn is triggered
  const handleSubmit = async () => {

    // handles if password is not equal
    if(password !== confirmPassword) {
      console.log("kode ikke ens!!");
      setAlert({
        open: true,
        message: "Password dont match",
        type: 'error'
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      // results is an object with a user inside it with all info about the current user
      console.log(result);
      setisLoggedIn(true);
      // closes the modal when signup in is succesfull
      props.onClose()
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>

      <Input 
      type="email" 
      label="Email" 
      placeholder="Enter your email"
      onChange={(e) => setEmail(e.target.value)}
      />

      <br></br>
      <Input 
      type="password" 
      label="password" 
      placeholder="Enter password" 
      onChange={(e) => setPassword(e.target.value)}
      />

      <br></br>
      <Input 
      type="password" 
      label="password" 
      placeholder="Confirm password" 
      onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className='mt-5'>
        <Button onClick={props.onClose} className='mr-3 bg-red-400'>Cancel</Button>
        <Button className='bg-[#ffd600]' onClick={handleSubmit}>Sign Up</Button>
      </div>

      {alert.open && (
      <div className={`text-${alert.type === 'error' ? 'red' : 'green'}-600 mt-2 text-sm`}>
        {alert.message}
      </div>
    )}

    {isLoggedIn && (
      <p>Your sign-up was successful. Welcome to our page.</p>
    )}
    </div>
  )
}
