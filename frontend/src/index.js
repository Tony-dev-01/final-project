import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GLOBALSTYLES from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GLOBALSTYLES/>
    <App />
  </React.StrictMode>
);
