import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConvexProvider } from 'convex/react';
import { convex } from './api/convexClient';
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
