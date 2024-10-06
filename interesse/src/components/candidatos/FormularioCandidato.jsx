
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function FormularioCandidato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [vagas, setVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState([]);
  const [candidato, setCandidato] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    obterVagas();
    if (id) {
      obterCandidato(id);
    }
  }, [id]);

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

  const obterCandidato = async (codigo) => {
    try {
      const resposta = await fetch(`http://localhost:4000/candidato/${codigo}`);
      const dados = await resposta.json();
      if (dados.status && dados.listaCandidatos.length > 0) {
        const cand = dados.listaCandidatos[0];
        setNome(cand.nome);
        setEmail(cand.email);
        setTelefone(cand.telefone);
        setVagaSelecionada(cand.vagas.map(v => v.codigo));
        setCandidato(cand);
      }
    } catch (erro) {
      console.error('Erro ao obter candidato:', erro);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      nome,
      email,
      telefone,
      vagaCodigo: vagaSelecionada
    };

    try {
      if (candidato) {
        
        dados.codigo = candidato.codigo;
        await fetch('http://localhost:4000/candidato/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dados),
        });
      } else {
        
        await fetch('http://localhost:4000/candidato/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dados),
        });
      }
      navigate('/candidatos');
    } catch (erro) {
      console.error('Erro ao salvar candidato:', erro);
    }
  };

  return (
    <div>
      <h2>{candidato ? 'Editar Candidato' : 'Novo Candidato'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="email" className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="telefone" className="mt-2">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="vagas" className="mt-2">
          <Form.Label>Vagas</Form.Label>
          <Form.Control as="select" multiple value={vagaSelecionada} onChange={(e) => {
            const options = e.target.options;
            let values = [];
            for (let i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                values.push(parseInt(options[i].value));
              }
            }
            setVagaSelecionada(values);
          }}>
            {vagas.map(vaga => (
              <option key={vaga.codigo} value={vaga.codigo}>{vaga.titulo}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Salvar
        </Button>
      </Form>
    </div>
  );
}

export default FormularioCandidato;
