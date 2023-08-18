import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GLOBALSTYLES from './GlobalStyles';
import { LeagueContextProvider } from './context/LeagueContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <LeagueContextProvider>
        <GLOBALSTYLES/>
        <App />
      </LeagueContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
