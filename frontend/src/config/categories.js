/** Categorias da loja — alinhadas com a pasta fts e backend */
export const CATEGORIAS_LOJA = [
  'Roupas femininas',
  'Roupas masculinas',
  'Infantil',
  'Lingerie e Pijamas',
  'Tops',
  'Sapatos',
  'Eletrodomésticos',
  'Mobília',
  'Casa & Decoração',
  'Celular e Acessórios',
  'Moda praia',
  'CYARA Trends',
  'CYARA MOD',
  'Tamanhos Grandes',
]

export function produtosDaCategoria(products, categoria) {
  if (!categoria || categoria === 'Categorias') {
    return products
  }
  if (categoria === 'Só para você' || categoria === 'Novo em') {
    return [...products].slice(0, 12)
  }
  if (categoria === 'Envio nacional') {
    return products
  }
  return products.filter((p) => p.category === categoria)
}
