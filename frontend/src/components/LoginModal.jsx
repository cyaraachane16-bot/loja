import Login from '../pages/Login'

export default function LoginModal({ open, onClose, onSuccess }) {
  if (!open) return null

  return (
    <div className="cyara-login-modal">
      <button
        type="button"
        className="cyara-login-modal__overlay"
        onClick={onClose}
        aria-label="Fechar"
      />
      <div className="cyara-login-modal__box">
        <button
          type="button"
          onClick={onClose}
          className="cyara-login-modal__close"
          aria-label="Fechar"
        >
          ×
        </button>
        <Login
          onSuccess={() => {
            onSuccess?.()
            onClose()
          }}
        />
      </div>
    </div>
  )
}
