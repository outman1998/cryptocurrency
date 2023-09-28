import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Context from './context/context';
import 'react-alice-carousel/lib/alice-carousel.css';
import {NextUIProvider} from "@nextui-org/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NextUIProvider>
  <React.StrictMode>
    <Context>
    <App />
    </Context>
  </React.StrictMode>
  </NextUIProvider>
);

