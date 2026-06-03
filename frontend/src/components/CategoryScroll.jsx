import { useRef } from 'react'
import { CATEGORIAS_LOJA } from '../config/categories'
import { useStore } from '../context/StoreContext'
import { IconChevronLeft, IconChevronRight } from './icons'
import { productImageUrl } from '../api'

export default function CategoryScroll({ products = [] }) {
  const { handlers, activeCategory } = useStore()
  const scrollRef = useRef(null)

  const categories = CATEGORIAS_LOJA.map((label) => {
    const produto = products.find((p) => p.category === label && p.image)
    const img = produto?.image ? productImageUrl(produto.image) : null
    const count = products.filter((p) => p.category === label).length
    return { label, img, count }
  }).filter((c) => c.count > 0)

  return (
    <section className="cyara-categorias">
      <div className="cyara-container relative">
        <button
          type="button"
          className="cyara-btn-scroll cyara-btn-scroll--esq"
          onClick={() => handlers.scrollCategorias(-1, scrollRef.current)}
          aria-label="Anterior"
        >
          <IconChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div ref={scrollRef} className="cyara-categorias__scroll">
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              className={`cyara-categoria ${
                activeCategory === cat.label ? 'cyara-categoria--active' : ''
              }`}
              onClick={() => handlers.categoria(cat.label)}
            >
              <div className="cyara-categoria__circulo">
                {cat.img ? (
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="cyara-img-categoria"
                    loading="lazy"
                    decoding="async"
                    width={56}
                    height={56}
                  />
                ) : (
                  <div className="w-[80%] h-[80%] rounded-full bg-[#e8e8e8]" />
                )}
              </div>
              <span className="cyara-categoria__label">{cat.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="cyara-btn-scroll cyara-btn-scroll--dir"
          onClick={() => handlers.scrollCategorias(1, scrollRef.current)}
          aria-label="Seguinte"
        >
          <IconChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  )
}
