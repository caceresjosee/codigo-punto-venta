import React, { useContext, useEffect, useState } from 'react'
import PosContext from '../../../../../context/pos/posContext';
import { getPlatosByCategoriaId } from '../../../../../services/categoriaService';
import PosPlato from './PosPlato'

const PosPlatos = () => {

  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { categoria_global } = useContext(PosContext);

  // SI NO TENEMOS UNA CATEGORIA GLOBAL, NO MOSTRAR NADA⚡
  // SI TENEMOS UNA CATEGORIA GLOBAL, CARGAR LOS PLATOS DE DICHA CATEGORÍA
  // SI LA CATEOGRÍA GLOBAL CAMBIA, EL COMPONENTE POSPLATOS, DEBE ACTUALIZAR LA INFO
  // CON LOS NUEVOS PLATOS

  useEffect(() => {
    setCargando(true)
    if (categoria_global) {
      getPlatosByCategoriaId(categoria_global.categoria_id).then(data => {
        if (data.ok) {
          setPlatos(data.content.Platos);
          setCargando(false);
        }
      })
    }
  }, [categoria_global]);


  return (
    <div className="carta__platos">
      {
        categoria_global ?
          cargando ?
            <div className="text-light">Cargando</div> :
            (
              platos.map(objPlato => {
                return <PosPlato objPlato={objPlato} key={objPlato.plato_id} />
              })
            )
          :
          <h4 className="text-light">
            Ninguna categoría ha sido seleccionada
          </h4>
      }

    </div>
  )
}

export default PosPlatos
