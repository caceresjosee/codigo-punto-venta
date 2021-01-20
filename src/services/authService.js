const URL_BACKEND = "https://codigo4-pos.herokuapp.com"

export const postLogin = async (objAuth) => {

  const peticion = await fetch(`${URL_BACKEND}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(objAuth)
  });
  let data = await peticion.json();
  return data
}

export const postVerificarToken = async token => {
  const peticion = await fetch(`${URL_BACKEND}/verificar`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await peticion.json();
  return data;
}