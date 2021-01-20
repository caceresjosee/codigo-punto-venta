import React, { useContext } from 'react'
import AuthContext from '../../../../../context/auth/authContext'
import logo from "./../../../../../assets/img/logo.svg"
import searchIcon from "./../../../../../assets/img/search.svg"
import { Link } from "react-router-dom";
const PosHeader = () => {

  const { usu_nom, cerrarSesion } = useContext(AuthContext)

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="" />
      </div>
      <div className="header__buscador">
        <img src={searchIcon} alt="" />
        <input type="text" className="header__input" placeholder="Busca un término" />
      </div>
      <div className="header__usuario mr-4">
        <Link className="btn btn-success mr-2" to="/admin/dashboard">
          Ir a admin
        </Link>
        <button className="btn btn-danger mr-2"
          onClick={() => {
            cerrarSesion();
          }}><i class="fas fa-door-open"></i>Salir</button>
        <img src="https://randomuser.me/api/portraits/men/90.jpg" alt="" />
        <span >{usu_nom}</span>
      </div>
    </header>
  )
}

export default PosHeader
