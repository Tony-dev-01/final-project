import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GLOBALSTYLES from './GlobalStyles';
import { LeagueContextProvider } from './context/LeagueContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LeagueContextProvider>
      <GLOBALSTYLES/>
      <App />
    </LeagueContextProvider>
  </React.StrictMode>
);
