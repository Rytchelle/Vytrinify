import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Vitrinify. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="/">Política de Privacidade</a>
          <a href="/">Termos de Uso</a>
          <a href="/">Contato</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
