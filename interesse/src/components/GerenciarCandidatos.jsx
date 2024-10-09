import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import FormCadCandidato from './Formularios/FormCadCandidato.jsx';
import TabelaCandidatos from './Tabelas/TabelaCandidatos.jsx';
import Pagina from './Templates/Pagina';
import { consultarTodos, gravar, alterar, excluir } from '../servicos/candidatoService';

const GerenciarCandidatos = () => {
    const [candidatos, setCandidatos] = useState([]);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    useEffect(() => {
        carregarCandidatos();
    }, []);

    const carregarCandidatos = async () => {
        try {
            const resultado = await consultarTodos();
            setCandidatos(resultado);
        } catch (erro) {
            setMensagem('Erro ao carregar candidatos.');
            setTipoMensagem('danger');
        }
    };

    const handleGravar = async (dadosCandidato) => {
        try {
            if (candidatoSelecionado) {
                await alterar(dadosCandidato);
                setMensagem('Candidato atualizado com sucesso!');
            } else {
                await gravar(dadosCandidato);
                setMensagem('Candidato gravado com sucesso!');
            }
            setTipoMensagem('success');
            carregarCandidatos();
            setCandidatoSelecionado(null);
        } catch (erro) {
            setMensagem('Erro ao gravar candidato.');
            setTipoMensagem('danger');
        }
    };

    const handleEditar = (candidato) => {
        setCandidatoSelecionado(candidato);
    };

    const handleExcluir = async (codigo) => {
        try {
            await excluir(codigo);
            setMensagem('Candidato excluído com sucesso!');
            setTipoMensagem('success');
            carregarCandidatos();
        } catch (erro) {
            setMensagem('Erro ao excluir candidato.');
            setTipoMensagem('danger');
        }
    };

    return (
        <Pagina titulo="Gerenciar Candidatos">
            {mensagem && <Alert variant={tipoMensagem}>{mensagem}</Alert>}

            <FormCadCandidato
                onGravar={handleGravar}
                candidatoSelecionado={candidatoSelecionado}
                setCandidatoSelecionado={setCandidatoSelecionado}
            />

            <TabelaCandidatos
                candidatos={candidatos}
                onEditar={handleEditar}
                onExcluir={handleExcluir}
            />
        </Pagina>
    );
};

export default GerenciarCandidatos;
