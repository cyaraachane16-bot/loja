import { createContext, useContext, useCallback, useEffect, useState } from 'react'
import {
  obterCarrinho,
  contarCarrinho,
  contarFavoritos,
  obterFavoritos,
} from '../js/store'
import * as actions from '../js/buttonActions'
import { aoFinalizarCompra } from '../js/checkout'

const StoreContext = createContext(null)

export function StoreProvider({ children, products }) {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [loginOpen, setLoginOpen] = useState(false)
  const [painel, setPainel] = useState(null)
  const [toast, setToast] = useState(null)
  const [activeNav, setActiveNav] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [factura, setFactura] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [activeHeroBanner, setActiveHeroBanner] = useState(null)

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    setCartCount(contarCarrinho())
    setWishlistCount(contarFavoritos())
    setCartItems(obterCarrinho())
  }, [])

  const mostrarToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3200)
  }, [])

  const ctx = {
    products,
    filteredProducts,
    setFilteredProducts,
    searchQuery,
    setSearchQuery,
    cartCount,
    setCartCount,
    wishlistCount,
    setWishlistCount,
    cartItems,
    setCartItems,
    loginOpen,
    setLoginOpen,
    painel,
    setPainel,
    activeNav,
    setActiveNav,
    activeCategory,
    setActiveCategory,
    factura,
    setFactura,
    checkoutLoading,
    setCheckoutLoading,
    activeHeroBanner,
    setActiveHeroBanner,
    mostrarToast,
  }

  const handlers = {
    promo: (i) => actions.aoClicarPromo(i, ctx),
    logo: () => actions.aoClicarLogo(),
    pesquisar: (termo) => actions.aoPesquisar(termo, ctx),
    conta: () => actions.aoClicarConta(ctx),
    carrinho: () => actions.aoClicarCarrinho(ctx),
    favoritos: () => actions.aoClicarFavoritos(ctx),
    suporte: () => actions.aoClicarSuporte(ctx),
    idioma: () => actions.aoClicarIdioma(ctx),
    nav: (cat) => actions.aoClicarNav(cat, ctx),
    comprarAgora: (slide) => actions.aoClicarComprarAgora(slide, ctx),
    bannerEsq: (t) => actions.aoClicarBannerEsquerdo(t, ctx),
    bannerDir: (t) => actions.aoClicarBannerDireito(t, ctx),
    desconto: () => actions.aoClicarDesconto(ctx),
    categoria: (n) => actions.aoClicarCategoria(n, ctx),
    scrollCategorias: (dir, ref) => actions.aoScrollCategorias(dir, ref),
    produto: (p) => actions.aoClicarProduto(p, ctx),
    favorito: (p, e) => actions.aoToggleFavorito(p, ctx, e),
    removerCarrinho: (id) => actions.aoRemoverDoCarrinho(id, ctx),
    fecharPainel: () => actions.aoFecharPainel(ctx),
    finalizarCompra: () => aoFinalizarCompra(ctx),
    slideAnterior: actions.aoSlideAnterior,
    slideSeguinte: actions.aoSlideSeguinte,
    irSlide: actions.aoIrParaSlide,
  }

  return (
    <StoreContext.Provider
      value={{
        ...ctx,
        handlers,
        toast,
        favoritos: obterFavoritos,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore deve estar dentro de StoreProvider')
  return store
}
