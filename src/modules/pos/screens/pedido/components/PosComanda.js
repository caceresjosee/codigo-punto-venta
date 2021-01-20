import React, { useContext } from 'react'
import PosContext from '../../../../../context/pos/posContext'
import { postPedido } from '../../../../../services/pedidoService';
import PosComandaItem from './PosComandaItem';
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import PosModalBoleta from './PosModalBoleta';

const PosComanda = () => {

  const { pedidos, mesa_global, borrarPedido, setModalBoleta } = useContext(PosContext);

  let pedidoActual = null;

  if (mesa_global) {
    pedidoActual = pedidos.find(objPedido => objPedido.objMesa.mesa_id === mesa_global.mesa_id);
  }

  const pagar = () => {
    // armar el objeto pedido
    /**
     * {
    "pedido_fech": "2021-01-15 09:20:00",
    "pedido_nro": "123",
    "pedido_est": "pagado",
    "usu_id": 9,
    "mesa_id": 4,
    "pedidoplatos": [
            {
                "plato_id": 1,
                "pedidoplato_cant": 3
            },
            {
                "plato_id": 2,
                "pedidoplato_cant": 2
            }
        ]
    }
     */

    Swal.fire({
      title: "¿Pagar el pedido?",
      text: "Confirme que está cancelando el total del pedido",
      icon: "warning",
      showCancelButton: true
    }).then(rpta => {

      if (rpta.isConfirmed) {
        let pedidoActual = pedidos.find(pedido => pedido.objMesa.mesa_id === mesa_global.mesa_id);
        let platos = pedidoActual.platos.map(plato => {
          return {
            plato_id: plato.plato_id,
            pedidoplato_cant: plato.cantidad
          }
        });
        const objPedido = {
          pedido_fech: moment().format("YYYY-MM-DD HH:mm:ss"),
          pedido_nro: uuidv4(),
          pedido_est: "pagado",
          usu_id: 2,
          mesa_id: mesa_global.mesa_id,
          pedidoplatos: platos
        }
        postPedido(objPedido).then(data => {
          if (data.ok) {
            // TO-DO: borrar el pedido de la mesa actual
            Swal.fire({
              title: "Hecho!",
              text: "Pedido registrado en la base de datos",
              icon: "success",
              timer: 700,
              position: "top-right"
            });
            setModalBoleta(true);
            //borrarPedido();
          }
        })
      }
    })




  }

  return (
    <div className="comanda">
      <h4 className="comanda__mesa">{mesa_global ? `Mesa ${mesa_global.mesa_nro}` : "Sin mesa seleccionada"}</h4>
      <p className="comanda__usuario">Carlos Jimenez</p>
      <hr />

      {
        !mesa_global ?
          (<div>Seleccione una mesa</div>) :
          pedidoActual ?
            (<>
              <ul className="comanda__lista">
                {
                  pedidoActual.platos.map(objPlato => {
                    return (<PosComandaItem objPlato={objPlato} key={objPlato.plato_id} />)
                  })
                }
              </ul>
              <button className="boton boton-success boton-block" onClick={() => {
                pagar();
              }}>PAGAR</button>
            </>) :
            <div>
              No hay pedidos en la mesa {mesa_global.mesa_nro} 😥
            </div>

      }

      <PosModalBoleta />
    </div>
  )
}

export default PosComanda
