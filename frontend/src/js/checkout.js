import { api } from '../api'
import { obterCarrinho, guardarCarrinho } from './store'

/**
 * Finalizar compra e obter factura do backend
 */
export async function aoFinalizarCompra(ctx) {
  const itens = obterCarrinho()

  if (!itens.length) {
    ctx.mostrarToast('O carrinho está vazio.')
    return
  }

  const payload = itens.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantidade || 1,
    image: item.image,
  }))

  try {
    ctx.setCheckoutLoading?.(true)

    const res = await api.post('/orders/guest', { items: payload })
    const factura = res.data.factura

    if (!factura) {
      ctx.mostrarToast(res.data.message || 'Não foi possível concluir a compra.')
      return
    }

    guardarCarrinho([])
    ctx.setCartCount(0)
    ctx.setCartItems([])
    ctx.setPainel(null)
    ctx.setFactura(factura)
    ctx.mostrarToast('Compra concluída! Factura gerada.')
  } catch {
    ctx.mostrarToast(
      'Erro ao finalizar. Verifique se o backend está a correr em http://localhost:3000',
    )
  } finally {
    ctx.setCheckoutLoading?.(false)
  }
}
