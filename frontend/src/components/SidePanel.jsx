import { useEffect, useState } from 'react'
import { useStore } from '../context/StoreContext'
import { obterCarrinho, obterFavoritos } from '../js/store'
import { productImageUrl } from '../api'

export default function SidePanel() {
  const { painel, handlers, cartCount, cartItems, checkoutLoading } = useStore()
  const [itens, setItens] = useState([])

  useEffect(() => {
    if (painel === 'carrinho') setItens(obterCarrinho())
    if (painel === 'favoritos') setItens(obterFavoritos())
  }, [painel, cartCount, cartItems])

  if (!painel) return null

  const titulo = painel === 'carrinho' ? 'Carrinho' : 'Favoritos'
  const total =
    painel === 'carrinho'
      ? itens.reduce((s, i) => s + i.price * (i.quantidade || 1), 0)
      : 0

  return (
    <>
      <button
        type="button"
        className="cyara-painel__overlay"
        onClick={handlers.fecharPainel}
        aria-label="Fechar"
      />
      <aside className={`cyara-painel ${painel ? 'cyara-painel--aberto' : ''}`}>
        <div className="cyara-painel__header">
          <h2 className="text-base font-semibold">{titulo}</h2>
          <button
            type="button"
            onClick={handlers.fecharPainel}
            className="text-2xl leading-none text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>
        <div className="cyara-painel__body">
          {itens.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              {painel === 'carrinho'
                ? 'O seu carrinho está vazio.'
                : 'Ainda não tem favoritos.'}
            </p>
          ) : (
            <ul className="space-y-4">
              {itens.map((item) => {
                const img = productImageUrl(item.image)
                return (
                  <li
                    key={item.id}
                    className="flex gap-3 border-b border-gray-100 pb-3"
                  >
                    <div className="cyara-painel__thumb">
                      {img && (
                        <img
                          src={img}
                          alt=""
                          className="cyara-img-painel"
                          loading="lazy"
                          width={72}
                          height={88}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-800 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-sm font-bold mt-1">{item.price} MT</p>
                      {painel === 'carrinho' && item.quantidade > 1 && (
                        <p className="text-xs text-gray-500">
                          Qtd: {item.quantidade}
                        </p>
                      )}
                      {painel === 'carrinho' && (
                        <button
                          type="button"
                          className="text-xs text-red-600 mt-1 hover:underline"
                          onClick={() => {
                            handlers.removerCarrinho(item.id)
                            setItens(obterCarrinho())
                          }}
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        {painel === 'carrinho' && itens.length > 0 && (
          <div className="p-4 border-t">
            <p className="text-sm font-bold mb-2">Total: {total.toFixed(0)} MT</p>
            <button
              type="button"
              className="cyara-btn-cta w-full disabled:opacity-50"
              disabled={checkoutLoading}
              onClick={handlers.finalizarCompra}
            >
              {checkoutLoading ? 'A processar...' : 'Finalizar compra'}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
