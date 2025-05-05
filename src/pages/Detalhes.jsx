// src/pages/Detalhes.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmpresas, avaliarEmpresa } from '../services/empresaService'; // Incluindo o serviço de avaliar
import Loader from '../components/Loader';
import PageWrapper from '../components/PageWrapper';
import StarRating from '../components/StarRating'; // Importando o componente StarRating
import Footer from '../components/Footer';
import '../styles/Detalhes.css';
import Header from '../components/Header';

function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avaliacao, setAvaliacao] = useState(0); // Estado para armazenar a avaliação temporária

  useEffect(() => {
    const empresas = getEmpresas();
    const encontrada = empresas.find((e) => e.id === parseInt(id));

    setTimeout(() => {
      setEmpresa(encontrada);
      setAvaliacao(encontrada ? encontrada.avaliacao : 0); // Carrega a avaliação atual da empresa
      setLoading(false);
    }, 500); // Simula um carregamento
  }, [id]);

  const handleAvaliacaoChange = (newRating) => {
    setAvaliacao(newRating); // Atualiza o estado de avaliação
    avaliarEmpresa(empresa.id, newRating); // Salva a avaliação no localStorage
  };

  if (loading) return <Loader />;

  if (!empresa) {
    return (
      <PageWrapper>
        <div className="detalhes">
          <h2>Empresa não encontrada.</h2>
          <button onClick={() => navigate('/')}>Voltar</button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="detalhes">
        <Header />
        <main>
          <section>
            <div className="section">
              <img className="model" src={empresa.imagem} alt={empresa.nome} />
              <div className="position">
                <h1><span>{empresa.ramo}</span> <br /> </h1>
               
                <h1> {empresa.nome} </h1>

                <p className='Descrição'>{empresa.descricao}</p>
                

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <div className="contato-botoes">
                     
                    <p className='email'>
                      <span>
                                   Email:
                      </span>
                        {empresa.Email}
                    </p>                
   
  
  

  <a
    href={`https://wa.me/${empresa.telefone.replace(/\D/g, '')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="botao-whatsapp" > WhatsApp
  </a>
</div>

</div>




                {/* Exibe a avaliação e permite que o usuário a altere */}
                <div>
                  <h3>Avaliar: <p>...  </p> < StarRating rating={avaliacao} onRatingChange={handleAvaliacaoChange} />
                  </h3>
                </div> 
              </div>
            </div>
          </section>
        </main>

        
      </div>
      <Footer />
    </PageWrapper>
  );
}

export default Detalhes;
