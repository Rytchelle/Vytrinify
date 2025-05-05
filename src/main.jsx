import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Destaques from './pages/Destaques';
import Detalhes from './pages/Detalhes'; // crie se ainda não tiver
import Sobre from './pages/Sobre';       // crie se ainda não tiver
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destaques" element={<Destaques />} />
        <Route path="/empresa/:id" element={<Detalhes />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
