import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { consultarTodas as consultarVagas } from '../../servicos/vagaService';

const FormCadCandidato = ({ onGravar, candidatoSelecionado, setCandidatoSelecionado }) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [idade, setIdade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [vagaCodigo, setVagaCodigo] = useState(''); 
    const [vagas, setVagas] = useState([]);


    useEffect(() => {
        if (candidatoSelecionado) {
            setNome(candidatoSelecionado.nome);
            setCpf(candidatoSelecionado.cpf);
            setIdade(candidatoSelecionado.idade);
            setTelefone(candidatoSelecionado.telefone);
            setVagaCodigo(candidatoSelecionado.vaga?.codigo || ''); 
        } else {
            setNome('');
            setCpf('');
            setIdade('');
            setTelefone('');
            setVagaCodigo('');
        }

       
        const carregarVagas = async () => {
            try {
                const resultadoVagas = await consultarVagas(); 
                setVagas(resultadoVagas);
            } catch (erro) {
                console.error('Erro ao carregar vagas:', erro);
            }
        };

        carregarVagas();
    }, [candidatoSelecionado]);

   
    const handleSubmit = (e) => {
        e.preventDefault();
        onGravar({ 
            codigo: candidatoSelecionado ? candidatoSelecionado.codigo : undefined, 
            nome, cpf, idade, telefone, vaga: { codigo: vagaCodigo } 
        });
      
        setNome('');
        setCpf('');
        setIdade('');
        setTelefone('');
        setVagaCodigo('');
        setCandidatoSelecionado(null); 
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formCpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formIdade">
                <Form.Label>Idade</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Digite a idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formVaga">
                <Form.Label>Vaga</Form.Label>
                <Form.Control
                    as="select"
                    value={vagaCodigo}
                    onChange={(e) => setVagaCodigo(e.target.value)}
                    required
                >
                    <option value="">Selecione uma vaga</option>
                    {vagas.map((vaga) => (
                        <option key={vaga.codigo} value={vaga.codigo}>
                            {vaga.cargo} - {vaga.cidade}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                {candidatoSelecionado ? 'Atualizar Candidato' : 'Adicionar Candidato'}
            </Button>
        </Form>
    );
};

export default FormCadCandidato;
