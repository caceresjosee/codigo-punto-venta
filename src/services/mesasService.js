import { URL_BACKEND } from "../environments/environments"

export const getMesas = async () => {
  const peticion = await fetch(`${URL_BACKEND}/mesa`);
  const data = await peticion.json();
  return data;
}