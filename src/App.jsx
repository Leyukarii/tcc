import React from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Pages/Home';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider> {/* Envolvendo a aplicação com AuthProvider */}
      <BrowserRouter>
        <Header />
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
