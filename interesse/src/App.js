import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListarCandidatos from './components/candidatos/ListarCandidatos';
import FormularioCandidato from './components/candidatos/FormularioCandidato';
import ListarVagas from './components/vagas/ListarVagas';
import FormularioVaga from './components/vagas/FormularioVaga';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ListarCandidatos />} />
          <Route path="/candidatos" element={<ListarCandidatos />} />
          <Route path="/candidatos/novo" element={<FormularioCandidato />} />
          <Route path="/candidatos/editar/:id" element={<FormularioCandidato />} />
          <Route path="/vagas" element={<ListarVagas />} />
          <Route path="/vagas/novo" element={<FormularioVaga />} />
          <Route path="/vagas/editar/:id" element={<FormularioVaga />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
