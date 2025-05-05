// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Header = ({ busca, setBusca }) => (
  
  <section >
    
    <div className="SUB-header" style={{ display: 'flex', flexDirection: 'row' }}>
      
    <div className="logo"><span>V</span>itrinif<span>y</span></div>

    {/* Campo de busca */}
    <input
      type="text"
      placeholder="Buscar empresa por nome..."
      value={busca}
      onChange={(e) => setBusca(e.target.value)}
        style={{
          marginRight: '20px',
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '400px'
      }}
      />
      </div>

    <header>
      <nav>
        <div className="nav">
          <div className="name"><Link to="/">HOME</Link></div>
          <Link to="/Destaques">DESTAQUES</Link>
          <div className="name"><Link to="/sobre">SOBRE NÓS</Link></div>
        </div>
      </nav>
    </header>
  </section>
);

export default Header;
