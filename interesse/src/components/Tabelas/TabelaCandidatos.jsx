import React, { useState } from 'react';
import { Table, Button, Form, FormControl } from 'react-bootstrap';

const TabelaCandidatos = ({ candidatos, onEditar, onExcluir }) => {
    const [termoBusca, setTermoBusca] = useState('');

    const candidatosFiltrados = candidatos.filter((candidato) => {
        const termo = termoBusca.toLowerCase();
        return (
            candidato.nome.toLowerCase().includes(termo) ||
            candidato.cpf.toLowerCase().includes(termo)
        );
    });

    return (
        <>
            <Form inline className="mb-3">
                <FormControl
                    type="text"
                    placeholder="Pesquisar por nome ou CPF"
                    className="mr-sm-2"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Idade</th>
                        <th>Telefone</th>
                        <th>Vaga</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {candidatosFiltrados.map((candidato) => (
                        <tr key={candidato.codigo}>
                            <td>{candidato.codigo}</td>
                            <td>{candidato.nome}</td>
                            <td>{candidato.cpf}</td>
                            <td>{candidato.idade}</td>
                            <td>{candidato.telefone}</td>
                            <td>{candidato.vaga?.cargo}</td>
                            <td>
                                <Button variant="warning" onClick={() => onEditar(candidato)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => onExcluir(candidato.codigo)}>
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TabelaCandidatos;
