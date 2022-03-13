import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './hooks/useAuthorization';

ReactDOM.render(
  <React.StrictMode>
   <HashRouter>
    <AuthProvider>
        <App />
      </AuthProvider>
   </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



