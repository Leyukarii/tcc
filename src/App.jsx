import React from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastroReceita from './Components/NovaReceita/CadastroReceita';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<CadastroReceita />} /> 
            <Route path="/login/*" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
