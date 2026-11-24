
import api from './api'

// Token armazenado somente na memória da aplicação
let accessToken = null

// Cadastro de usuário
export async function cadastrarUsuario({ email, password }) {
    const response = await api.post('/usuarios/cadastrar/', {
        email: email.trim().toLowerCase(),
        password
    })

    return response.data
}

// Login utilizando SimpleJWT
export async function autenticarUsuario({ email, password }) {
    const response = await api.post('/token/', {
        username: email.trim().toLowerCase(),
        password
    })

    accessToken = response.data.access

    return response.data
}

// Disponibiliza o token para o Axios
export function obterToken() {
    return accessToken
}

// Verifica se existe uma autenticação em memória
export function estaAutenticado() {
    return Boolean(accessToken)
}

// Encerra a sessão
export function encerrarSessao() {
    accessToken = null
}
