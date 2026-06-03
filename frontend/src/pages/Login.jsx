import { useState } from 'react'
import { api } from '../api'

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await api.post('/auth/login', { email, password })
      const token = res.data.access_token

      if (!token) {
        setError('Resposta inválida do servidor.')
        return
      }

      localStorage.setItem('token', token)
      onSuccess?.()
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Não foi possível iniciar sessão. Verifique email e palavra-passe.'
      setError(Array.isArray(msg) ? msg.join(', ') : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-none shadow-xl border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Login Admin</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="admin@exemplo.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Palavra-passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? 'A entrar...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
