import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const FormCadVaga = ({ onGravar, vagaSelecionada, setVagaSelecionada }) => {
    const [cargo, setCargo] = useState('');
    const [salario, setSalario] = useState('');
    const [cidade, setCidade] = useState('');

    useEffect(() => {
        if (vagaSelecionada) {
            setCargo(vagaSelecionada.cargo);
            setSalario(vagaSelecionada.salario);
            setCidade(vagaSelecionada.cidade);
        } else {
            setCargo('');
            setSalario('');
            setCidade('');
        }
    }, [vagaSelecionada]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGravar({
            codigo: vagaSelecionada ? vagaSelecionada.codigo : undefined,
            cargo,
            salario,
            cidade,
        });
        setCargo('');
        setSalario('');
        setCidade('');
        setVagaSelecionada(null); 
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCargoVaga">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formSalarioVaga">
                <Form.Label>Salário</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Digite o salário"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formCidadeVaga">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite a cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {vagaSelecionada ? 'Atualizar Vaga' : 'Adicionar Vaga'}
            </Button>
        </Form>
    );
};

export default FormCadVaga;
