
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListarVagas() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    obterVagas();
  }, []);

  const obterVagas = async () => {
    try {
      const resposta = await fetch('http://localhost:4000/vaga/');
      const dados = await resposta.json();
      if (dados.status) {
        setVagas(dados.listaVagas);
      }
    } catch (erro) {
      console.error('Erro ao obter vagas:', erro);
    }
  };

  const excluirVaga = async (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir esta vaga?')) {
      try {
        await fetch('http://localhost:4000/vaga/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo }),
        });
        obterVagas();
      } catch (erro) {
        console.error('Erro ao excluir vaga:', erro);
      }
    }
  };

  return (
    <div>
      <h2>Vagas</h2>
      <div className="d-flex justify-content-between mb-3">
        <Link to="/vagas/novo" className="btn btn-primary">Nova Vaga</Link>
        {}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Localização</th>
            <th>Salário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vagas.map(vaga => (
            <tr key={vaga.codigo}>
              <td>{vaga.codigo}</td>
              <td>{vaga.titulo}</td>
              <td>{vaga.localizacao}</td>
              <td>{vaga.salario}</td>
              <td>
                <Link to={`/vagas/editar/${vaga.codigo}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => excluirVaga(vaga.codigo)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListarVagas;
