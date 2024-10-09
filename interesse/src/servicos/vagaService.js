const urlBase = "http://localhost:4000/vaga";

export const consultarTodas = async (token) => {
    const response = await fetch(urlBase, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao consultar vagas.');
    }

    const data = await response.json();
    return data.listaVagas;
};

export const gravar = async (vaga, token) => {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vaga),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao gravar vaga.');
    }

    const data = await response.json();
    return data;
};

export const alterar = async (vaga, token) => {
    const response = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vaga),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao alterar vaga.');
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
        throw new Error('Erro ao excluir vaga.');
    }

    const data = await response.json();
    return data;
};
