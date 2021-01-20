import { URL_BACKEND } from "../environments/environments"

export const postPedido = async objPedido => {
  const peticion = await fetch(`${URL_BACKEND}/pedido`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(objPedido)
  });
  const data = await peticion.json();
  return data;
}

export const getPedidos = async () => {
  const peticion = await fetch(`${URL_BACKEND}/pedido`);
  const data = await peticion.json();
  return data;
}

export const getPedidoById = async (pedido_id) => {
  const peticion = await fetch(`${URL_BACKEND}/pedido/${pedido_id}`);
  const data = await peticion.json();
  return data;
}