import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as NavbarBS, Nav, Container } from 'react-bootstrap';

function Navbar() {
  return (
    <NavbarBS bg="dark" variant="dark" expand="lg">
      <Container>
        <NavbarBS.Brand href="/">Meu Projeto</NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBS.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/candidatos">Candidatos</NavLink>
            <NavLink className="nav-link" to="/vagas">Vagas</NavLink>
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
}

export default Navbar;
