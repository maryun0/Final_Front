// src/componentes/Templates/Pagina.js
import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Pagina = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Sistema de Gestão de Vagas e Candidatos
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="outline-light" onClick={() => navigate('/candidatos')} className="mr-2">
            Candidatos
          </Button>
          <Button variant="outline-light" onClick={() => navigate('/vagas')} className="mr-2">
            Vagas
          </Button>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Pagina;
