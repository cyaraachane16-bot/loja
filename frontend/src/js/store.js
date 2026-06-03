const CHAVES = {
  carrinho: 'cyara_carrinho',
  favoritos: 'cyara_favoritos',
}

function ler(chave) {
  try {
    const raw = localStorage.getItem(chave)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function guardar(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados))
}

export function obterCarrinho() {
  return ler(CHAVES.carrinho)
}

export function guardarCarrinho(itens) {
  guardar(CHAVES.carrinho, itens)
}

export function obterFavoritos() {
  return ler(CHAVES.favoritos)
}

export function guardarFavoritos(itens) {
  guardar(CHAVES.favoritos, itens)
}

export function contarCarrinho() {
  return obterCarrinho().reduce((s, i) => s + (i.quantidade || 1), 0)
}

export function contarFavoritos() {
  return obterFavoritos().length
}
