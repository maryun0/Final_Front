import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TabelaVagas = ({ vagas, onEditar, onExcluir }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Cargo</th>
                    <th>Salário</th>
                    <th>Cidade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {vagas.map((vaga) => (
                    <tr key={vaga.codigo}>
                        <td>{vaga.codigo}</td>
                        <td>{vaga.cargo}</td>
                        <td>{vaga.salario}</td>
                        <td>{vaga.cidade}</td>
                        <td>
                            <Button variant="warning" onClick={() => onEditar(vaga)}>
                                Editar
                            </Button>{' '}
                            <Button variant="danger" onClick={() => onExcluir(vaga.codigo)}>
                                Excluir
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TabelaVagas;
