import React, {useState} from 'react'
import {Button, Input} from "@nextui-org/react";
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';

export default function Login(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async () => {

    // handles if password is not equal
    if(!password || !email) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      // results is an object with a user inside it with all info about the current user
      console.log(result);
      // closes the modal when signup in is succesfull
      props.onClose()
    } catch (error) {
      setError("Login failed. Please check your email and password.");
      console.log(error);
    }

  }

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
    props.onClose();
  }

  return (
    <div>

      <Input       
      onChange={(e) => setEmail(e.target.value)}
      type="email" 
      label="Email" 
      placeholder="Enter your email" />
      <br></br>
      <Input 
      type="password" 
      label="password" 
      placeholder="Enter password" 
      onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>

      <div className='mt-5'>
        <Button onClick={props.onClose} className='mr-3 bg-red-400'>Cancel</Button>
        <Button className='bg-[#ffd600]' onClick={handleSubmit}>Login</Button>
      </div>

      <div className='mt-5 w-full text-center'>
        <p className='mb-2 text-[17px] font-bold m-auto'>OR</p>
        <GoogleButton 
        style={{width: "100%", outline: "none", borderRadius: "3px"}}
        onClick={signInWithGoogle}
        />
      </div>
      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
    </div>
  )
}
