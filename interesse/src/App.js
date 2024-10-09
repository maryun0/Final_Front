import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GerenciarCandidatos from './components/GerenciarCandidatos.jsx';
import GerenciarVagas from './components/GerenciarVagas.jsx';
import Pagina from './components/Templates/Pagina.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/candidatos" element={<GerenciarCandidatos />} />
        <Route path="/vagas" element={<GerenciarVagas />} />
        <Route path="/*" element={<Pagina />} />
      </Routes>
    </Router>
  );
};

export default App;
