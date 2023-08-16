import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import Rootpage from "./pages/Rootpage";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    minHeight: '100vh'
  }
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Rootpage />,
    children: [
      {path: '/', element: <Homepage />},
      {path: '/coins/:id', element: <Coinpage />}

    ]
  }

]);

function App() {


  const classes = useStyles();

  return (
      <div className={classes.App}>
        <RouterProvider router={router} />
      </div>
  );

}

export default App;
