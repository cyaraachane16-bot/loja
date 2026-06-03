/**
 * Funções JavaScript para cada botão da loja.
 * Recebem o estado (ctx) e actualizam a interface.
 */

import {
  obterCarrinho,
  guardarCarrinho,
  obterFavoritos,
  guardarFavoritos,
} from './store'
import { produtosDaCategoria } from '../config/categories'
import {
  bannerPorTitulo,
  bannerPorId,
  produtosDoBanner,
} from '../config/banners'

function activarBannerHero(ctx, titulo, lado) {
  const banner = bannerPorTitulo(titulo, lado)
  if (!banner) return false
  ctx.setActiveHeroBanner(banner.id)
  ctx.setActiveCategory(banner.title)
  const lista = produtosDoBanner(ctx.products, banner)
  ctx.setFilteredProducts(lista.length ? lista : ctx.products)
  ctx.mostrarToast(banner.title)
  document.querySelector('.cyara-produtos')?.scrollIntoView({ behavior: 'smooth' })
  return true
}

function activarBannerHeroPorId(ctx, id) {
  const banner = bannerPorId(id)
  if (!banner) return false
  ctx.setActiveHeroBanner(banner.id)
  const lista = produtosDoBanner(ctx.products, banner)
  ctx.setFilteredProducts(lista.length ? lista : ctx.products)
  ctx.mostrarToast(banner.title)
  document.querySelector('.cyara-produtos')?.scrollIntoView({ behavior: 'smooth' })
  return true
}

function limparBannerHero(ctx) {
  ctx.setActiveHeroBanner(null)
}

/** Barra promocional — 3 botões */
export function aoClicarPromo(indice, ctx) {
  const mensagens = [
    'Cadastre a sua loja na CYARA! Entre em contacto connosco.',
    'Frete grátis em compras acima de 5000 MT. Consulte condições.',
    'CYARA Lar & Estilo — qualidade e estilo para si.',
  ]
  ctx.mostrarToast(mensagens[indice] || mensagens[0])
}

/** Logo — voltar ao topo */
export function aoClicarLogo() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** Pesquisa — filtrar produtos */
export function aoPesquisar(termo, ctx) {
  const q = (termo || '').trim().toLowerCase()
  ctx.setSearchQuery(termo)

  if (!q) {
    ctx.setFilteredProducts(ctx.products)
    ctx.mostrarToast('Mostrando todos os produtos')
    return
  }

  const filtrados = ctx.products.filter(
    (p) =>
      p.name?.toLowerCase().includes(q) ||
      String(p.price).includes(q),
  )
  ctx.setFilteredProducts(filtrados)
  ctx.mostrarToast(
    filtrados.length
      ? `${filtrados.length} resultado(s) para "${termo}"`
      : `Nenhum produto encontrado para "${termo}"`,
  )
}

/** Ícone utilizador — abrir login */
export function aoClicarConta(ctx) {
  ctx.setLoginOpen(true)
}

/** Carrinho — abrir painel */
export function aoClicarCarrinho(ctx) {
  ctx.setPainel('carrinho')
}

/** Favoritos — abrir painel */
export function aoClicarFavoritos(ctx) {
  ctx.setPainel('favoritos')
}

/** Suporte */
export function aoClicarSuporte(ctx) {
  ctx.mostrarToast(
    'Suporte CYARA: WhatsApp +258 84 000 0000 | Email: suporte@cyara.co.mz',
  )
}

/** Idioma / região */
export function aoClicarIdioma(ctx) {
  ctx.mostrarToast('Região: Moçambique (MT) | Idioma: Português')
  ctx.setLoginOpen(true)
}

/** Menu de navegação */
export function aoClicarNav(categoria, ctx) {
  ctx.setActiveNav(categoria)
  ctx.setActiveCategory(null)

  if (categoria === 'Categorias') {
    ctx.mostrarToast('Escolha uma categoria abaixo')
    document.querySelector('.cyara-categorias')?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  if (categoria === 'CYARA Trends' && activarBannerHeroPorId(ctx, 'cyara-trends')) {
    return
  }
  if (categoria === 'CYARA MOD' && activarBannerHeroPorId(ctx, 'cyara-mod')) {
    return
  }

  limparBannerHero(ctx)

  const filtrados = produtosDaCategoria(ctx.products, categoria)
  ctx.setFilteredProducts(filtrados.length ? filtrados : ctx.products)
  ctx.mostrarToast(`Categoria: ${categoria}`)
  document.querySelector('.cyara-produtos')?.scrollIntoView({ behavior: 'smooth' })
}

/** Carrossel — slide anterior */
export function aoSlideAnterior(indiceAtual, total, setIndex) {
  setIndex((indiceAtual - 1 + total) % total)
}

/** Carrossel — slide seguinte */
export function aoSlideSeguinte(indiceAtual, total, setIndex) {
  setIndex((indiceAtual + 1) % total)
}

/** Carrossel — ir para slide */
export function aoIrParaSlide(i, setIndex) {
  setIndex(i)
}

/** Botão COMPRE AGORA no hero */
export function aoClicarComprarAgora(slide, ctx) {
  if (slide.product) {
    aoAdicionarAoCarrinho(slide.product, ctx)
    return
  }
  ctx.mostrarToast('Explore os nossos produtos recomendados!')
  document.querySelector('.cyara-produtos')?.scrollIntoView({ behavior: 'smooth' })
}

/** Banner lateral esquerdo */
export function aoClicarBannerEsquerdo(titulo, ctx) {
  if (activarBannerHero(ctx, titulo, 'esq')) return
  ctx.setActiveCategory(titulo)
  limparBannerHero(ctx)
  ctx.mostrarToast(titulo)
  document.querySelector('.cyara-produtos')?.scrollIntoView({ behavior: 'smooth' })
}

/** Banner lateral direito (marcas) */
export function aoClicarBannerDireito(titulo, ctx) {
  if (activarBannerHero(ctx, titulo, 'dir')) return
  ctx.mostrarToast(`Coleção ${titulo}`)
  document.querySelector('.cyara-produtos')?.scrollIntoView({ behavior: 'smooth' })
}

/** Tab desconto lateral */
export function aoClicarDesconto(ctx) {
  const codigo = 'CYARA12'
  if (navigator.clipboard) {
    navigator.clipboard.writeText(codigo)
    ctx.mostrarToast(`Código copiado: ${codigo} — 12% de desconto!`)
  } else {
    ctx.mostrarToast(`Use o código ${codigo} no checkout`)
  }
}

/** Categoria circular */
export function aoClicarCategoria(nome, ctx) {
  ctx.setActiveCategory(nome)
  if (nome === 'CYARA Trends') {
    activarBannerHeroPorId(ctx, 'cyara-trends')
    return
  }
  if (nome === 'CYARA MOD') {
    activarBannerHeroPorId(ctx, 'cyara-mod')
    return
  }
  limparBannerHero(ctx)
  const filtrados = produtosDaCategoria(ctx.products, nome)
  ctx.setFilteredProducts(filtrados.length ? filtrados : ctx.products)
  ctx.mostrarToast(`Categoria: ${nome}`)
  document.querySelector('.cyara-produtos')?.scrollIntoView({ behavior: 'smooth' })
}

/** Scroll categorias */
export function aoScrollCategorias(direcao, elementoRef) {
  elementoRef?.scrollBy({ left: direcao * 240, behavior: 'smooth' })
}

/** Adicionar ao carrinho */
export function aoAdicionarAoCarrinho(produto, ctx) {
  const carrinho = obterCarrinho()
  const existente = carrinho.find((i) => i.id === produto.id)

  if (existente) {
    existente.quantidade = (existente.quantidade || 1) + 1
  } else {
    carrinho.push({ ...produto, quantidade: 1 })
  }

  guardarCarrinho(carrinho)
  ctx.setCartCount(carrinho.reduce((s, i) => s + i.quantidade, 0))
  ctx.mostrarToast(`${produto.name} adicionado ao carrinho`)
}

/** Toggle favorito */
export function aoToggleFavorito(produto, ctx, e) {
  e?.stopPropagation()
  let favoritos = obterFavoritos()
  const idx = favoritos.findIndex((f) => f.id === produto.id)

  if (idx >= 0) {
    favoritos = favoritos.filter((f) => f.id !== produto.id)
    ctx.mostrarToast('Removido dos favoritos')
  } else {
    favoritos.push(produto)
    ctx.mostrarToast('Adicionado aos favoritos')
  }

  guardarFavoritos(favoritos)
  ctx.setWishlistCount(favoritos.length)
}

/** Clicar no card do produto */
export function aoClicarProduto(produto, ctx) {
  aoAdicionarAoCarrinho(produto, ctx)
  ctx.setPainel('carrinho')
}

/** Remover do carrinho */
export function aoRemoverDoCarrinho(id, ctx) {
  const carrinho = obterCarrinho().filter((i) => i.id !== id)
  guardarCarrinho(carrinho)
  const total = carrinho.reduce((s, i) => s + (i.quantidade || 1), 0)
  ctx.setCartCount(total)
  ctx.setCartItems(carrinho)
  ctx.mostrarToast('Item removido')
}

/** Fechar painel */
export function aoFecharPainel(ctx) {
  ctx.setPainel(null)
}
