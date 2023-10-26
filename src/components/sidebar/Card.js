import React, {useEffect} from "react";
import { useCurrency } from "../../context/context";
import {Avatar, Button} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AiFillDelete } from "react-icons/ai";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Carden() {

  const {user, setAlert, setIsOpen, watchlist, coins, fetchCoins, currency} = useCurrency();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

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

  const removeFromWatchlist = async (coin) => {

    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef, 
        {
        coins: watchlist.filter((watchlist) => watchlist !== coin?.id),
        },
        {merge: "true"}
        );

        setAlert({
          open: true,
          message: `${coin.name} removed from the watchlist!`,
          type: 'succes'
        });
    } catch(error) {
      console.log(error);
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }

  }

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
          return (
          <div key={coin} className="flex mt-2 text-center justify-between">
            <p className="text-center text-md font-bold">{formattedCoin}</p> <AiFillDelete
            className="cursor-pointer text-gray-300"
            onClick={() => removeFromWatchlist(coin)}
            />
            </div> 
            );
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
