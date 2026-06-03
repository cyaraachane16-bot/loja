import { useStore } from '../context/StoreContext'

const promos = [
  {
    html: (
      <>
        <span className="cyara-promo__castanho">VENDA NA </span>
        <span className="cyara-promo__vermelho">CYARA</span>
        <span className="cyara-promo__castanho"> CADASTRE-SE AGORA</span>
      </>
    ),
  },
  {
    html: (
      <>
        <span className="cyara-promo__castanho">FRETE GRÁTIS </span>
        <span className="cyara-promo__dourado">VEJA CONDIÇÕES</span>
      </>
    ),
  },
  {
    html: (
      <>
        <span className="cyara-promo__castanho">CYARA NA REMESSA CONFORME </span>
        <span className="cyara-promo__vermelho">CYARA</span>
        <span className="cyara-promo__castanho"> COM VOCÊ!</span>
      </>
    ),
  },
]

export default function TopPromoBar() {
  const { handlers } = useStore()

  return (
    <div className="cyara-promo">
      <div className="cyara-promo__grid">
        {promos.map((item, i) => (
          <button
            key={i}
            type="button"
            className="cyara-promo__item"
            onClick={() => handlers.promo(i)}
          >
            {item.html}
          </button>
        ))}
      </div>
    </div>
  )
}
