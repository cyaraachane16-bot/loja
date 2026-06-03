import { useStore } from '../context/StoreContext'

export default function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return <div className="cyara-toast">{toast}</div>
}
