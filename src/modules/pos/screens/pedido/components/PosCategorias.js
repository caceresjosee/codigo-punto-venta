import React, { useContext, useEffect, useState } from 'react'
import PosContext from '../../../../../context/pos/posContext';
import { getCategorias } from '../../../../../services/categoriaService';
import platoIcon from "./../../../../../assets/img/plato_blanco.svg"

const PosCategorias = () => {

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { seleccionarCategoriaGlobal, categoria_global } = useContext(PosContext);


  useEffect(() => {
    getCategorias().then(data => {
      if (data.ok) {
        setCategorias(data.content);
        setCargando(false);
      }
    })
  }, []);

  return (
    <nav className="menu">
      <ul className="menu__lista">
        {cargando ?
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div> :

          categorias.map(objCategoria => {
            // return (<li className="active">
            return (<li style={{ textAlign: "center" }}
              key={objCategoria.categoria_id}
              className={
                objCategoria.categoria_id === categoria_global?.categoria_id ? "active" : ""
              }
              onClick={() => {
                seleccionarCategoriaGlobal(objCategoria);
              }}>
              <img src={platoIcon} alt="" />
              <span>{objCategoria.categoria_nom}</span>
            </li>);
          })
        }
      </ul>
    </nav>
  )
}

export default PosCategorias
