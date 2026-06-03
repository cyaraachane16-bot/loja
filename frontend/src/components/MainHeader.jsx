import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import {
  IconSearch,
  IconUser,
  IconCart,
  IconHeart,
  IconHeadset,
  IconGlobe,
} from './icons'

export default function MainHeader() {
  const { handlers, cartCount, wishlistCount } = useStore()
  const [query, setQuery] = useState('')

  function submitSearch(e) {
    e?.preventDefault()
    handlers.pesquisar(query)
  }

  return (
    <header className="cyara-header">
      <div className="cyara-header__inner">
        <button type="button" className="cyara-logo" onClick={handlers.logo}>
          CYARA
        </button>

        <form className="cyara-search" onSubmit={submitSearch}>
          <div className="cyara-search__box">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Vestido"
              className="cyara-search__input"
            />
            <button type="submit" className="cyara-search__btn" aria-label="Pesquisar">
              <IconSearch className="w-[18px] h-[18px]" />
            </button>
          </div>
        </form>

        <div className="cyara-header__icons">
          <button
            type="button"
            className="cyara-btn-icon"
            title="Conta"
            onClick={handlers.conta}
          >
            <IconUser className="w-[22px] h-[22px]" />
          </button>
          <button
            type="button"
            className="cyara-btn-icon"
            title="Carrinho"
            onClick={handlers.carrinho}
          >
            <IconCart className="w-[22px] h-[22px]" />
            <span className="cyara-btn-icon__badge">{cartCount}</span>
          </button>
          <button
            type="button"
            className="cyara-btn-icon"
            title="Favoritos"
            onClick={handlers.favoritos}
          >
            <IconHeart className="w-[22px] h-[22px]" />
            <span className="cyara-btn-icon__badge">{wishlistCount}</span>
          </button>
          <button
            type="button"
            className="cyara-btn-icon cyara-btn-icon--desktop"
            title="Suporte"
            onClick={handlers.suporte}
          >
            <IconHeadset className="w-[22px] h-[22px]" />
          </button>
          <button
            type="button"
            className="cyara-btn-icon cyara-btn-icon--desktop"
            title="Idioma"
            onClick={handlers.idioma}
          >
            <IconGlobe className="w-[22px] h-[22px]" />
          </button>
        </div>
      </div>
    </header>
  )
}
