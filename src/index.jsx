import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';

import { RouterProvider } from "react-router-dom";
import { router } from './Pages/routes';
import { AuthProvider } from './context/AuthContext'; // Importa o AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Envolve toda a aplicação com o AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
