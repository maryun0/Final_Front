import React, { useState } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';

const TabelaCandidatos = ({ candidatos, onEditar, onExcluir }) => {
    const [termoBusca, setTermoBusca] = useState(''); 

    
    const candidatosFiltrados = candidatos.filter((candidato) => {
        const termo = termoBusca.toLowerCase();
        const nomeFiltrado = candidato.nome.toLowerCase().includes(termo);
        const vagaFiltrada = candidato.vaga?.cargo.toLowerCase().includes(termo);
        return nomeFiltrado || vagaFiltrada; 
    });

    return (
        <>
            <Form inline className="mb-3">
                <FormControl
                    type="text"
                    placeholder="Pesquisar por nome ou vaga"
                    className="mr-sm-2"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
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
                            <td>{candidato.nome}</td>
                            <td>{candidato.cpf}</td>
                            <td>{candidato.idade}</td>
                            <td>{candidato.telefone}</td>
                            <td>{candidato.vaga?.cargo} - {candidato.vaga?.cidade}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="mr-2"
                                    onClick={() => onEditar(candidato)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onExcluir(candidato.codigo)}
                                >
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
