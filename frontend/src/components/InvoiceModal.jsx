import { useStore } from '../context/StoreContext'

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-MZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatarPreco(valor) {
  return `${Number(valor).toLocaleString('pt-MZ')} MT`
}

export default function InvoiceModal() {
  const { factura, setFactura } = useStore()

  if (!factura) return null

  function imprimir() {
    window.print()
  }

  function fechar() {
    setFactura(null)
  }

  return (
    <div className="cyara-factura-overlay">
      <div className="cyara-factura" id="factura-impressao">
        <div className="cyara-factura__toolbar no-print">
          <h2 className="cyara-factura__titulo-modal">Factura</h2>
          <div className="cyara-factura__acoes">
            <button type="button" className="cyara-btn-cta" onClick={imprimir}>
              Imprimir / PDF
            </button>
            <button type="button" className="cyara-factura__fechar" onClick={fechar}>
              Fechar
            </button>
          </div>
        </div>

        <header className="cyara-factura__header">
          <div>
            <p className="cyara-factura__marca">{factura.empresa.nome}</p>
            <p className="cyara-factura__info">{factura.empresa.morada}</p>
            <p className="cyara-factura__info">NUIT: {factura.empresa.nuit}</p>
            <p className="cyara-factura__info">{factura.empresa.email}</p>
            <p className="cyara-factura__info">{factura.empresa.telefone}</p>
          </div>
          <div className="cyara-factura__meta">
            <p className="cyara-factura__tipo">FACTURA</p>
            <p>
              <strong>N.º</strong> {factura.numero}
            </p>
            <p>
              <strong>Data</strong> {formatarData(factura.data)}
            </p>
          </div>
        </header>

        <table className="cyara-factura__tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Preço unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {factura.itens.map((item) => (
              <tr key={item.id + item.nome}>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>{formatarPreco(item.precoUnitario)}</td>
                <td>{formatarPreco(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cyara-factura__totais">
          <p>
            <span>Subtotal</span>
            <span>{formatarPreco(factura.subtotal)}</span>
          </p>
          <p>
            <span>IVA (16%)</span>
            <span>{formatarPreco(factura.iva)}</span>
          </p>
          <p className="cyara-factura__total-final">
            <span>Total</span>
            <span>{formatarPreco(factura.total)}</span>
          </p>
        </div>

        <p className="cyara-factura__mensagem">{factura.mensagem}</p>
      </div>
    </div>
  )
}
