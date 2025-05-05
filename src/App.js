import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Destaques from './pages/Destaques';
import Detalhes from './pages/Detalhes';
import Sobre from './pages/Sobre';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destaques" element={<Destaques />} />
        <Route path="/empresa/:id" element={<Detalhes />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
}

export default App;
