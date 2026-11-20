import { ref } from 'vue'

const FAVORITOS_KEY = 'mangeflix_favoritos'
const USUARIO_KEY = 'mangeflix_usuario'

export function lerFavoritos() {
  try { return JSON.parse(localStorage.getItem(FAVORITOS_KEY) || '[]') }
  catch { return [] }
}
export function alternarFavorito(id) {
  const atuais = lerFavoritos()
  const novos = atuais.includes(id) ? atuais.filter(item => item !== id) : [...atuais, id]
  localStorage.setItem(FAVORITOS_KEY, JSON.stringify(novos))
  return novos
}
export function obterUsuario() {
  try { return JSON.parse(localStorage.getItem(USUARIO_KEY) || 'null') }
  catch { return null }
}
export function salvarSessao(usuario) {
  localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario))
}
export function encerrarSessao() {
  localStorage.removeItem(USUARIO_KEY)
}
