import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import FormCadVaga from './Formularios/FormCadVaga.jsx';
import TabelaVagas from './Tabelas/TabelaVagas.jsx';
import Pagina from './Templates/Pagina';
import { consultarTodas, gravar, alterar, excluir } from '../servicos/vagaService';

const GerenciarVagas = () => {
    const [vagas, setVagas] = useState([]);
    const [vagaSelecionada, setVagaSelecionada] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    useEffect(() => {
        carregarVagas();
    }, []);

    const carregarVagas = async () => {
        try {
            const resultado = await consultarTodas();
            setVagas(resultado);
        } catch (erro) {
            setMensagem('Erro ao carregar vagas.');
            setTipoMensagem('danger');
        }
    };

    const handleGravar = async (dadosVaga) => {
        try {
            if (vagaSelecionada) {
                await alterar(dadosVaga);
                setMensagem('Vaga atualizada com sucesso!');
            } else {
                await gravar(dadosVaga);
                setMensagem('Vaga gravada com sucesso!');
            }
            setTipoMensagem('success');
            carregarVagas();
            setVagaSelecionada(null);
        } catch (erro) {
            setMensagem('Erro ao gravar vaga.');
            setTipoMensagem('danger');
        }
    };

    const handleEditar = (vaga) => {
        setVagaSelecionada(vaga);
    };

    const handleExcluir = async (codigo) => {
        try {
            await excluir(codigo);
            setMensagem('Vaga excluída com sucesso!');
            setTipoMensagem('success');
            carregarVagas();
        } catch (erro) {
            setMensagem('Erro ao excluir vaga.');
            setTipoMensagem('danger');
        }
    };

    return (
        <Pagina titulo="Gerenciar Vagas">
            {mensagem && <Alert variant={tipoMensagem}>{mensagem}</Alert>}

            <FormCadVaga
                onGravar={handleGravar}
                vagaSelecionada={vagaSelecionada}
                setVagaSelecionada={setVagaSelecionada}
            />

            <TabelaVagas
                vagas={vagas}
                onEditar={handleEditar}
                onExcluir={handleExcluir}
            />
        </Pagina>
    );
};

export default GerenciarVagas;
