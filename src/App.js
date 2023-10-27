import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import Rootpage from "./pages/Rootpage";
import Cryptopage from "./pages/Cryptopage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Rootpage />,
    children: [
      {path: '/', element: <Homepage />},
      {path: '/coins/:id', element: <Coinpage />},
      {path: '/Cryptopage', element: <Cryptopage />}

    ]
  }
]);

function App() {
  return (
      <div>
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
