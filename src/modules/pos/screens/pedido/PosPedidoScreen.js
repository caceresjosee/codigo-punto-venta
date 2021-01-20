import React, { useContext } from 'react'
import PosContext from '../../../../context/pos/posContext'
import PosCategorias from './components/PosCategorias'
import PosComanda from './components/PosComanda'
import PosHeader from './components/PosHeader'
import PosMesas from './components/PosMesas'
import PosPlatos from './components/PosPlatos'

const PosPedidoScreen = () => {
  const { categoria_global, mesa_global } = useContext(PosContext);
  return (
    <>
      <PosHeader />
      <main className="pos-container">
        <PosCategorias />
        <section className="tabla">
          <PosMesas />
          <div className="pedido">
            <div className="carta">
              <h3>Lista de Platos Categoria: &nbsp;
                <span className="color-secundario">{categoria_global?.categoria_nom || "Seleccione"}</span>
              </h3>

              <PosPlatos />
            </div>
            <div className="boleta">
              <h3>Pedido Mesa: &nbsp;
                <span className="color-secundario">{mesa_global?.mesa_nro || "Seleccione"}</span>
              </h3>
              <hr />
              <PosComanda />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default PosPedidoScreen
