// src/components/PageWrapper.jsx
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { motion } from 'framer-motion';
import '../styles/PageWrapper.css'; // Importa o CSS adicional que vamos criar

const pageVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

function PageWrapper({ children }) {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 0); // tempo de carregamento (ms)
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {carregando ? (
        <Loader />
      ) : (
        <motion.div
          className="page-wrapper" // Adiciona a classe
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={pageVariants}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

export default PageWrapper;
