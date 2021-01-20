import React from 'react'

const PosComandaItem = ({ objPlato }) => {
  return (
    <li className="comanda__item">
      <p className="comanda__nombre">
        <span><strong>{objPlato.plato_nom}</strong></span>
        <span>Precio: S/ {objPlato.plato_pre}</span>
      </p>
      <p className="comanda__cantidad">{objPlato.cantidad}</p>
      <p className="comanda__precio">
        <strong>S/ {+objPlato.cantidad * +objPlato.plato_pre}</strong>
      </p>
    </li>
  )
}

export default PosComandaItem
