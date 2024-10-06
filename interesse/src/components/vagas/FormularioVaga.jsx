// src/components/vagas/FormularioVaga.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function FormularioVaga() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [salario, setSalario] = useState('');
  const [vaga, setVaga] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      obterVaga(id);
    }
  }, [id]);

  const obterVaga = async (codigo) => {
    try {
      const resposta = await fetch(`http://localhost:4000/vaga/${codigo}`);
      const dados = await resposta.json();
      if (dados.status && dados.listaVagas.length > 0) {
        const vg = dados.listaVagas[0];
        setTitulo(vg.titulo);
        setDescricao(vg.descricao);
        setLocalizacao(vg.localizacao);
        setSalario(vg.salario);
        setVaga(vg);
      }
    } catch (erro) {
      console.error('Erro ao obter vaga:', erro);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      titulo,
      descricao,
      localizacao,
      salario: parseFloat(salario)
    };

    try {
      if (vaga) {
        // Atualizar vaga
        dados.codigo = vaga.codigo;
        await fetch('http://localhost:4000/vaga/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dados),
        });
      } else {
        // Criar nova vaga
        await fetch('http://localhost:4000/vaga/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dados),
        });
      }
      navigate('/vagas');
    } catch (erro) {
      console.error('Erro ao salvar vaga:', erro);
    }
  };

  return (
    <div>
      <h2>{vaga ? 'Editar Vaga' : 'Nova Vaga'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="titulo">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="descricao" className="mt-2">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="localizacao" className="mt-2">
          <Form.Label>Localização</Form.Label>
          <Form.Control type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="salario" className="mt-2">
          <Form.Label>Salário</Form.Label>
          <Form.Control type="number" value={salario} onChange={(e) => setSalario(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Salvar
        </Button>
      </Form>
    </div>
  );
}

export default FormularioVaga;
