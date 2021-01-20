import { URL_BACKEND } from "../environments/environments";
export const getCategorias = async () => {
  const peticion = await fetch(`${URL_BACKEND}/categoria`);
  const data = await peticion.json();
  return data;
}
export const getPlatosByCategoriaId = async id => {
  const peticion = await fetch(`${URL_BACKEND}/categoria/${id}/platos`);
  const data = await peticion.json();
  return data;
}