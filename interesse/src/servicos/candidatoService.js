const urlBase = 'http://localhost:4000/candidato';

export const consultarTodos = async (token) => {
    const response = await fetch(urlBase, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao consultar candidatos.');
    }

    const data = await response.json();
    return data.listaCandidatos;
};

export const gravar = async (candidato, token) => {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidato),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao gravar candidato.');
    }

    const data = await response.json();
    return data;
};

export const alterar = async (candidato, token) => {
    const response = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidato),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao alterar candidato.');
    }

    const data = await response.json();
    return data;
};

export const excluir = async (codigo, token) => {
    const response = await fetch(urlBase, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir candidato.');
    }

    const data = await response.json();
    return data;
};
