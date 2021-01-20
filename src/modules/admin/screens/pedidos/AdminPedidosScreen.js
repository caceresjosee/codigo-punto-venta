import React, { useEffect, useState } from 'react'
import { MDBDataTableV5 } from "mdbreact";
import { getPedidos } from '../../../../services/pedidoService';

const AdminPedidosScreen = ({ history }) => {


  const [datatable, setDatatable] = useState({
    columns: [
      { label: "Id", field: "pedido_id" },
      { label: "Fecha", field: "pedido_fech" },
      { label: "Nro", field: "pedido_nro" },
      { label: "Estado", field: "pedido_est" },
      { label: "Usuario", field: "usuario_nombre" },
      { label: "Mesa", field: "numero_mesa" },
      { label: "Platos", field: "total_platos" },
      { label: "Acciones", field: "acciones" }
    ],
    rows: []
  });

  useEffect(() => {
    getPedidos().then((data) => {
      if (data.ok) {
        const filas = data.pedidos.map((pedido) => {
          return {
            pedido_id: pedido.pedido_id,
            pedido_fech: pedido.pedido_fech,
            pedido_nro: pedido.pedido_nro,
            pedido_est: pedido.pedido_est,
            usuario_nombre: pedido.Usuario?.usu_nom + " " + pedido.Usuario?.usu_ape,
            numero_mesa: pedido.Mesa?.mesa_nro,
            total_platos: pedido.PedidoPlatos.reduce((valorAnt, objActual) => {
              return valorAnt + +objActual.pedidoplato_cant;
            }, 0),
            acciones: <button className="btn btn-dark" onClick={() => {
              history.push(`/admin/pedidos/${pedido.pedido_id}`);
            }}>Ver Pedido</button>
          }
        });

        setDatatable({
          ...datatable,
          rows: filas
        })
      }
    })
  }, []);



  return (
    <main className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="display-4 text-center">
            Lista de Pedidos
          </h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">

              <MDBDataTableV5 data={datatable} />

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminPedidosScreen
