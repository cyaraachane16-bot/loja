/** Banners laterais — imagens pelo nome do banner / ficheiro */

function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function slugDoTitulo(titulo) {
  return norm(titulo).replace(/\s+/g, '-')
}

function textoProduto(p) {
  return `${norm(p.name)} ${norm(p.image)}`
}

/** Esquerda — ordem fixa (não alterar) */
export const BANNERS_ESQ = [
  { id: 'mais-vendidos', title: 'Mais Vendidos', heroTag: 'MAIS VENDIDOS', order: 1 },
  { id: 'envio-nacional', title: 'Envio Nacional', heroTag: 'ENVIO NACIONAL', order: 2 },
  { id: 'cyara-trends', title: 'CYARA Trends', heroTag: 'CYARA TRENDS', category: 'CYARA Trends', order: 3 },
]

/** Direita — ordem fixa (não alterar) */
export const BANNERS_DIR = [
  { id: 'enchnt', title: 'Enchnt', heroTag: 'ENCHNT', order: 1 },
  { id: 'cyara-mod', title: 'CYARA MOD', heroTag: 'CYARA MOD', category: 'CYARA MOD', order: 2 },
  { id: 'travachic', title: 'TRAVACHIC', heroTag: 'TRAVACHIC', order: 3 },
]

/** Todos os banners laterais, ordem de renderização fixa */
export const BANNERS_LATERAIS = [...BANNERS_ESQ, ...BANNERS_DIR]

const MATCHERS = {
  'mais-vendidos': (p) => /mais[\s-]?vendidos/.test(textoProduto(p)),
  'envio-nacional': (p) =>
    /envio[\s-]?nacional/.test(textoProduto(p)) ||
    p.category === 'Eletrodomésticos' ||
    p.category === 'Mobília',
  enchnt: (p) =>
    /enchnt/.test(textoProduto(p)) || p.category === 'Lingerie e Pijamas',
  travachic: (p) => /travachic/.test(textoProduto(p)) || p.category === 'Tops',
}

export function produtosDoBanner(products, banner) {
  if (!banner) return []

  const slug = slugDoTitulo(banner.title)
  let lista = products.filter((p) => {
    if (!p.image) return false
    if (banner.category && p.category === banner.category) return true
    const t = textoProduto(p)
    if (t.includes(norm(banner.title)) || t.includes(slug)) return true
    const matcher = MATCHERS[banner.id]
    return matcher ? matcher(p) : false
  })

  if (banner.id === 'mais-vendidos' && lista.length === 0) {
    lista = [...products]
      .filter((p) => p.image)
      .sort((a, b) => b.price - a.price)
      .slice(0, 12)
  }

  if (banner.id === 'envio-nacional') {
    const porNome = products.filter(
      (p) => p.image && /envio[\s-]?nacional/.test(textoProduto(p)),
    )
    if (porNome.length) {
      const ids = new Set(porNome.map((p) => p.id))
      const resto = lista.filter((p) => !ids.has(p.id))
      lista = [...porNome, ...resto]
    }
  }

  return lista
}

export function bannerPorTitulo(titulo, lado = 'esq') {
  const lista = lado === 'dir' ? BANNERS_DIR : BANNERS_ESQ
  return lista.find((b) => b.title === titulo) ?? null
}

export function bannerPorId(id) {
  return [...BANNERS_ESQ, ...BANNERS_DIR].find((b) => b.id === id) ?? null
}
