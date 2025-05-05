import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';

function Sobre() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0); // simula carregamento

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <div style={{ padding: '2rem' }}>
          <h2>Sobre Nós</h2>
          <p>Somos uma plataforma dedicada a dar visibilidade às melhores empresas do mercado.</p>
        </div>
      )}

      <Footer />
    </PageWrapper>
  );
}

export default Sobre;
