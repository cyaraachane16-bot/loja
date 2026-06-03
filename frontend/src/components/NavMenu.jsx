import { useStore } from '../context/StoreContext'
import { IconChevronDown, IconChevronRight } from './icons'

const links = [
  { label: 'Categorias', dropdown: true },
  'Só para você',
  'Novo em',
  'Envio nacional',
  'CYARA Trends',
  'Roupas femininas',
  'Moda praia',
  'Sapatos',
  'Infantil',
  'Eletrodomésticos',
  'Mobília',
  'Roupas masculinas',
  'Casa & Decoração',
  'Tamanhos Grandes',
]

export default function NavMenu() {
  const { handlers, activeNav } = useStore()

  return (
    <nav className="cyara-nav">
      <ul className="cyara-nav__list scrollbar-hide">
        {links.map((item) => {
          const label = typeof item === 'string' ? item : item.label
          const dropdown = typeof item === 'object' && item.dropdown
          const active = activeNav === label
          return (
            <li key={label}>
              <button
                type="button"
                className={`cyara-nav__link ${active ? 'cyara-nav__link--active' : ''}`}
                onClick={() => handlers.nav(label)}
              >
                {label}
                {dropdown && <IconChevronDown className="w-3 h-3 opacity-80" />}
              </button>
            </li>
          )
        })}
        <li>
          <IconChevronRight className="w-3.5 h-3.5 text-white/60 inline" />
        </li>
      </ul>
    </nav>
  )
}
