import React, { useContext } from 'react'
import { Redirect, Route } from "react-router-dom";
import AuthContext from './context/auth/authContext';

const Private = ({ path, component: Component }) => {

  const { autenticado, cargando } = useContext(AuthContext);

  if (cargando) {
    return <div>Cargando...</div>
  } else {
    return (
      autenticado ? <Route path={path} component={Component} /> :
        <Redirect to="/auth/login" />
    )
  }

}

export default Private
