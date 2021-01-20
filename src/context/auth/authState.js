import React, { useEffect, useState } from 'react'
import { postVerificarToken } from '../../services/authService';
import AuthContext from './authContext';
import { useHistory } from "react-router-dom";

const AuthState = ({ children }) => {

  const history = useHistory();

  const [auth, setAuth] = useState({
    autenticado: false,
    usu_nom: null,
    usu_id: null,
    token: null,
    cargando: true
  });


  const cerrarSesion = () => {
    localStorage.removeItem("token");
    // push() vs replace()
    // push() nos da la posibilidad de navegar a una nueva ruta, sin embargo
    // podemos clicar en el botón ATRÁS del navegador y podemos tener problemas.
    // replace() mismo comportamiento pero borra el historial de navegacion
    // en nuestro proyecto
    history.replace("/");
    setAuth({
      autenticado: false,
      usu_nom: null,
      usu_id: null,
      token: null,
      cargando: true
    })
  }
  const iniciarSesionContext = token => {

    // guardamos el token en el localstorage porque
    // cuando actualizamos la página, el localstorage no se borra.
    localStorage.setItem("token", token);

    const payload = token.split(".")[1];
    const payloadDesencriptado = window.atob(payload);
    const payloadJSON = JSON.parse(payloadDesencriptado);
    setAuth({
      autenticado: true,
      usu_nom: payloadJSON.usu_nom,
      usu_id: payloadJSON.usu_id,
      token: token,
      cargando: false
    });
  }

  const iniciarSesionConLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      //TODO verificar si el token tenía tiempo de vida
      // a través del BACKEND
      postVerificarToken(token).then(data => {
        console.log(data);
        if (data.ok) {
          const payload = token.split(".")[1];
          const payloadDesencriptado = window.atob(payload);
          const payloadJSON = JSON.parse(payloadDesencriptado);
          setAuth({
            autenticado: true,
            usu_nom: payloadJSON.usu_nom,
            usu_id: payloadJSON.usu_id,
            token: token,
            cargando: false
          });
        } else {
          //Sí había token, pero ya había caducado o el token estaba alterado
          localStorage.removeItem("token");
          setAuth({
            autenticado: false,
            usu_nom: null,
            usu_id: null,
            token: null,
            cargando: false
          })
        }
        // SI EL TOKEN ES VÁLIDO, INICIAR SESIÓN EN EL STATE DEL CONTEXT
      })
    } else {
      // No hacer nada o redireccionar al home
      setAuth({
        autenticado: false,
        usu_nom: null,
        usu_id: null,
        token: null,
        cargando: false
      })
    }
  }
  useEffect(() => {
    iniciarSesionConLocalStorage();
  }, [])

  return (
    <AuthContext.Provider value={{
      autenticado: auth.autenticado,
      usu_nom: auth.usu_nom,
      usu_id: auth.usu_id,
      token: auth.token,
      cargando: auth.cargando,
      iniciarSesionContext: iniciarSesionContext,
      cerrarSesion: cerrarSesion
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
