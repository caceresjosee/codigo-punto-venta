import React, { useContext, useEffect, useState } from 'react'
import PosContext from '../../../../../context/pos/posContext';
import { getMesas } from '../../../../../services/mesasService';

const PosMesas = () => {

  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { seleccionarMesaGlobal, mesa_global } = useContext(PosContext);

  useEffect(() => {
    getMesas().then(data => {
      if (data.ok) {
        setMesas(data.content);
      }
      setCargando(false);
    })
  }, [])

  return (
    <div className="mesas">
      <ul className="mesas__lista">
        {
          cargando ?

            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div> :

            mesas.map((objMesa) => {
              return (<li className={objMesa.mesa_id === mesa_global?.mesa_id ? "mesas__mesa activo" : ""}
                key={objMesa.mesa_id} onClick={() => {
                  seleccionarMesaGlobal(objMesa);
                }}>
                <span className="mesas__titulo">Mesa</span>
                <span className="mesas__numero">{objMesa.mesa_nro}</span>
              </li>)
            })
        }
      </ul>
      <div className="mesas__info"></div>
    </div>
  )
}

export default PosMesas
