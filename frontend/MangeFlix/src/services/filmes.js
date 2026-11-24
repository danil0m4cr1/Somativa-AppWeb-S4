
const API_FILMES =
    'https://raw.githubusercontent.com/danielvieira95/DESM-2/master/filmes.json'

let filmesCache = null

export async function buscarFilmes() {
    if (filmesCache) {
        return filmesCache
    }

    const response = await fetch(API_FILMES)

    if (!response.ok) {
        throw new Error('Não foi possível carregar os filmes.')
    }

    const dados = await response.json()

    filmesCache = dados.map((filme, index) => ({
        id: index + 1,
        titulo: filme.nome,
        poster: filme.imagem,
        capa: filme.imagem,
        duracao: filme['duração'],
        ano: filme['ano de lançamento'],
        nota: filme.nota,
        genero: 'Não informado',
        classificacao: 'Não informado',
        descricao: 'Descrição não disponível.'
    }))

    return filmesCache
}
