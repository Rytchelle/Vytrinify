import React, { useEffect, useState } from 'react';
import { getEmpresas } from '../services/empresaService';
import PageWrapper from '../components/PageWrapper';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import '../styles/destaques.css';
import StarRating from '../components/StarRating';
import { useNavigate } from 'react-router-dom';

function Destaques() {
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const empresas = getEmpresas();

    const topEmpresas = [...empresas]
      .filter(e => e.avaliacao > 0)
      .sort((a, b) => b.avaliacao - a.avaliacao)
      .slice(0, 3);

    setTimeout(() => {
      setDestaques(topEmpresas);
      setLoading(false);
    }, 0); // simula carregamento
  }, []);

  const handleDetalhes = (id) => {
    navigate(`/empresa/${id}`);
  };

  return (
    <PageWrapper>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <div className="destaques-container">
          <h2>Empresas em Destaque</h2>
          <div className="destaques-lista">
            {destaques.map((empresa) => (
              <div
                key={empresa.id}
                className="destaque-card"
                onClick={() => handleDetalhes(empresa.id)}
              >
                <img src={empresa.imagem} alt={empresa.nome} />
                <h3>{empresa.nome}</h3>
                <p><strong>Ramo:</strong> {empresa.ramo}</p>
                <StarRating rating={empresa.avaliacao || 0} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </PageWrapper>
  );
}

export default Destaques;
