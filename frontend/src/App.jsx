import { useEffect, useState } from 'react'
import { api } from './api'
import { StoreProvider, useStore } from './context/StoreContext'
import TopPromoBar from './components/TopPromoBar'
import MainHeader from './components/MainHeader'
import NavMenu from './components/NavMenu'
import HeroSection from './components/HeroSection'
import CategoryScroll from './components/CategoryScroll'
import ProductSection from './components/ProductSection'
import LoginModal from './components/LoginModal'
import SidePanel from './components/SidePanel'
import InvoiceModal from './components/InvoiceModal'
import Toast from './components/Toast'

function Loja({ products, loading, error }) {
  const { loginOpen, setLoginOpen } = useStore()

  return (
    <>
      <TopPromoBar />
      <MainHeader />
      <NavMenu />
      <HeroSection products={products} />
      <CategoryScroll products={products} />
      <ProductSection loading={loading} error={error} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <SidePanel />
      <InvoiceModal />
      <Toast />
      <footer className="cyara-footer">
        © {new Date().getFullYear()} CYARA LAR &amp; ESTILO
      </footer>
    </>
  )
}

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => {
        setError(
          'Não foi possível carregar os produtos. Inicie o backend em http://localhost:3000',
        )
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="cyara-page">
      <StoreProvider products={products}>
        <Loja products={products} loading={loading} error={error} />
      </StoreProvider>
    </div>
  )
}

export default App
