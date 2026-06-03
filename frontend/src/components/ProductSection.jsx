import { useStore } from '../context/StoreContext'
import { obterFavoritos } from '../js/store'
import { productImageUrl } from '../api'

export default function ProductSection({ loading, error }) {
  const { filteredProducts, handlers, wishlistCount, activeCategory } = useStore()
  const favoritos = obterFavoritos()
  const favIds = new Set(favoritos.map((f) => f.id))
  void wishlistCount

  if (!loading && !error && filteredProducts.length === 0) return null

  return (
    <section className="cyara-produtos">
      <div className="cyara-container">
        <h2 className="cyara-produtos__titulo">
          {activeCategory ? activeCategory : 'Recomendados para você'}
        </h2>

        {loading && (
          <p className="text-center text-sm text-gray-500">A carregar...</p>
        )}

        {error && (
          <p className="text-center text-sm text-red-600 bg-white border p-4 rounded max-w-md mx-auto">
            {error}
          </p>
        )}

        <div className="cyara-produtos__grid">
          {filteredProducts.map((p) => {
            const img = productImageUrl(p.image)
            const isFav = favIds.has(p.id)
            return (
              <button
                key={p.id}
                type="button"
                className="cyara-card-produto"
                onClick={() => handlers.produto(p)}
              >
                <div className="cyara-card-produto__img-wrap">
                  {img ? (
                    <img
                      src={img}
                      alt={p.name}
                      className="cyara-img-produto"
                      loading="lazy"
                      decoding="async"
                      width={140}
                      height={140}
                    />
                  ) : (
                    <div className="cyara-img-produto flex items-center justify-center text-gray-300 text-xs">
                      —
                    </div>
                  )}
                  <span
                    role="button"
                    tabIndex={0}
                    className="cyara-card-produto__fav"
                    onClick={(e) => handlers.favorito(p, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handlers.favorito(p, e)
                    }}
                  >
                    {isFav ? '♥' : '♡'}
                  </span>
                </div>
                <div className="cyara-card-produto__body">
                  <h3 className="cyara-card-produto__nome">{p.name}</h3>
                  {p.category && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{p.category}</p>
                  )}
                  <p className="cyara-card-produto__preco">{p.price} MT</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
