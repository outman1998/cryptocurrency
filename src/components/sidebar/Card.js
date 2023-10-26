import React from "react";
import { useCurrency } from "../../context/context";
import {Avatar, Button} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Carden() {

  const {user, setAlert, setIsOpen, watchlist, coins} = useCurrency();

  const logOut = () => {
    console.log("hej");
    signOut(auth)
    setAlert({
      open: true,
      type: "success",
      message: "Logout successfull!"
    })
    setIsOpen(false);
  }
  console.log(watchlist);

  return (
    <>

    <div className="m-auto">
      <Avatar 
      src={user?.photoURL}
      alt={user?.displayName || user?.email}
      className="w-40 h-40 text-large cursor-pointer m-auto"
      />

      <h2 className="text-black font-bold text-xl mt-2">{user?.email}</h2>
    </div>

    <div className="watchlist m-5">
    <Card>
      <CardBody>
        <p className="font-bold text-black m-auto text-lg">Watchlist</p>
        <hr></hr>
        {watchlist.map((coin) => {
          // Capitalize the first letter and make the rest lowercase
          const formattedCoin = coin.charAt(0).toUpperCase() + coin.slice(1).toLowerCase();
          
          return <p className="text-center text-md">{formattedCoin}</p>;
        })}

      </CardBody>
    </Card>
    </div>

    <div className="fixed bottom-0 left-0 right-0 p-2">
        <Button onClick={logOut} className="bg-red-400 font-bold text-lg w-full">
          Log out
        </Button>
    </div>
    </>

  );
}
