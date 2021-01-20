import React, { useReducer } from 'react'
import PosContext from './posContext'
import PosReducer from './posReducer';

const PosState = ({ children }) => {

  const [state, dispatch] = useReducer(PosReducer, {
    categoria_global: null,
    mesa_global: null,
    pedidos: [],
    modal_boleta: false,
  });

  const setModalBoleta = (valor) => {
    dispatch({
      type: "MODAL_BOLETA",
      data: valor
    })
  }
  
  const borrarPedido = () => {
    let { mesa_global, pedidos } = state;
    pedidos = pedidos.filter(pedido => pedido.objMesa.mesa_id !== mesa_global.mesa_id);
    dispatch({
      type: "ACTUALIZAR_PEDIDOS",
      data: pedidos
    })
  }
  const incrementarPlatoAPedido = objPlato => {
    const { pedidos, mesa_global } = state;
    if (!mesa_global) return;
    // casos a considerar
    // 1. si la mesa estaba vacía, y es el primer plato del pedido
    // 2. si la mesa tenía un pedido pero no tenía el plato, y vamos 
    // a crear el primer plato de ese pedido
    // 3. si la mesa tenía un pedido y tenía un plato de ese tipo en el 
    // pedido, para incrementar la cantidad de platos en ese pedido

    // intentar obtener un pedidoActual en el que figure la mesa_global
    let objPedidoActual =
      pedidos.find(objPedido => objPedido.objMesa.mesa_id === mesa_global.mesa_id);

    // preguntamos si el objPedido actual, es un obj que existe(es decir que la mesa
    // global seleccionada estuviera presente en un pedido del arreglo de pedidos),
    // en caso contrario, el objPedidoActual(linea 24) sería "undefined"
    if (objPedidoActual) {
      // significa que la mesa_global actual, ya tenía un pedido}
      // Vamos a analizar si el plato que queremos agregar al pedido, ya existía
      let platoPedido =
        objPedidoActual.platos.find(plato => plato.plato_id === objPlato.plato_id);

      // Preguntamos si el plato que estuvimos buscando, ya se encontraba 
      // en el arreglo de platos, debemos autmentar una unidad a la cantidad.
      // en caso contrario, significa que la mesa sí tenía platos, pero no 
      // tenía un plato como el que queremos agregar
      if (platoPedido) {
        // ya había uno o más platos del plato que queremos agregar
        platoPedido.cantidad += 1;
        dispatch({
          type: "ACTUALIZAR_PEDIDOS",
          data: pedidos
        })
      } else {
        // la mesa tenía platos, pero no como el que queremos agregar
        objPedidoActual.platos.push({
          ...objPlato,
          cantidad: 1
        });
        dispatch({
          type: "ACTUALIZAR_PEDIDOS",
          data: pedidos
        })
      }


    } else {
      // significa que la mesa_global actual, está vacía, no tenía ningún pedido
      // agregamos el primer pedido de la mesa_actual con su primer plato
      pedidos.push({
        estado: "pendiente",
        objMesa: {
          ...mesa_global
        },
        platos: [
          {
            ...objPlato,
            cantidad: 1
          }
        ]
      });

      // Entonces actualizamos el state global
      dispatch({
        type: "ACTUALIZAR_PEDIDOS",
        data: pedidos
      });
    }
  }
  const restarPlatoAPedido = objPlato => {
    let { pedidos, mesa_global } = state;
    if (!mesa_global) return;
    let objPedidoActual =
      pedidos.find(objPedido => objPedido.objMesa.mesa_id === mesa_global.mesa_id);
    if (objPedidoActual) {
      let platoPedido =
        objPedidoActual.platos.find(plato => plato.plato_id === objPlato.plato_id);
      if (platoPedido) {
        platoPedido.cantidad -= 1;
        if (platoPedido.cantidad === 0) {
          objPedidoActual.platos = objPedidoActual.platos.filter(plato => plato.plato_id !== objPlato.plato_id);
          if (objPedidoActual.platos.length === 0) {
            pedidos = pedidos.filter(pedido => pedido.objMesa.mesa_id !== mesa_global.mesa_id);
          }
        }
        dispatch({
          type: "ACTUALIZAR_PEDIDOS",
          data: pedidos
        });
      }
    }
  }
  const seleccionarCategoriaGlobal = objCategoria => {
    // intentar seleccionar o settear una categoria global
    dispatch({
      data: objCategoria,
      type: "SELECCIONAR_CATEGORIA"
    });
  }
  const seleccionarMesaGlobal = objMesa => {
    dispatch({
      data: objMesa,
      type: "SELECCIONAR_MESA"
    })
  }


  return (
    <PosContext.Provider value={{
      mesa_global: state.mesa_global,
      categoria_global: state.categoria_global,
      pedidos: state.pedidos,

      modal_boleta: state.modal_boleta,
      setModalBoleta: setModalBoleta,

      borrarPedido: borrarPedido,
      restarPlatoAPedido: restarPlatoAPedido,
      seleccionarCategoriaGlobal: seleccionarCategoriaGlobal,
      seleccionarMesaGlobal: seleccionarMesaGlobal,
      incrementarPlatoAPedido: incrementarPlatoAPedido
    }}>
      {children}
    </PosContext.Provider>
  )
}

export default PosState
