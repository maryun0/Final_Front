
import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListarCandidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [tipoBusca, setTipoBusca] = useState('nome'); 

  useEffect(() => {
    obterCandidatos();
  }, []);

  const obterCandidatos = async (termo = '', tipo = 'nome') => {
    try {
      let url = 'http://localhost:4000/candidato/';
      if (termo) {
        url += `${encodeURIComponent(termo)}?tipo=${tipo}`;
      }
      const resposta = await fetch(url);
      const dados = await resposta.json();
      if (dados.status) {
        setCandidatos(dados.listaCandidatos);
      }
    } catch (erro) {
      console.error('Erro ao obter candidatos:', erro);
    }
  };

  const excluirCandidato = async (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este candidato?')) {
      try {
        await fetch('http://localhost:4000/candidato/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo }),
        });
        obterCandidatos();
      } catch (erro) {
        console.error('Erro ao excluir candidato:', erro);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    obterCandidatos(termoBusca, tipoBusca);
  };

  return (
    <div>
      <h2>Candidatos</h2>
      <div className="d-flex justify-content-between mb-3">
        <Link to="/candidatos/novo" className="btn btn-primary">Novo Candidato</Link>
        <Form onSubmit={handleSearch} className="d-flex">
          <Form.Control
            as="select"
            value={tipoBusca}
            onChange={(e) => setTipoBusca(e.target.value)}
            className="me-2"
          >
            <option value="nome">Buscar por Nome</option>
            <option value="vaga">Buscar por Vaga</option>
          </Form.Control>
          <Form.Control
            type="text"
            placeholder={`Buscar candidato por ${tipoBusca === 'nome' ? 'nome' : 'vaga'}`}
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="me-2"
          />
          <Button variant="outline-primary" type="submit">Buscar</Button>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Vaga(s)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map(candidato => (
            <tr key={candidato.codigo}>
              <td>{candidato.codigo}</td>
              <td>{candidato.nome}</td>
              <td>{candidato.email}</td>
              <td>{candidato.telefone}</td>
              <td>
                {candidato.vagas && candidato.vagas.length > 0 ? (
                  candidato.vagas.map(vaga => (
                    <div key={vaga.codigo}>{vaga.titulo}</div>
                  ))
                ) : (
                  'Nenhuma vaga associada'
                )}
              </td>
              <td>
                <Link to={`/candidatos/editar/${candidato.codigo}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => excluirCandidato(candidato.codigo)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListarCandidatos;
