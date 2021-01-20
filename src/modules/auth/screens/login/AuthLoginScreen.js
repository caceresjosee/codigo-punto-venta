import React, { useContext, useState } from 'react'
import AuthContext from '../../../../context/auth/authContext';
import { postLogin } from '../../../../services/authService';



const AuthLoginScreen = (props) => {

  const { iniciarSesionContext } = useContext(AuthContext);

  const [formulario, setFormulario] = useState({
    correo: "",
    password: ""
  });

  const handleChange = e => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const submit = e => {
    e.preventDefault();
    // TODO: Aplicar validación
    postLogin(formulario).then(rpta => {
      console.log(rpta);
      if (rpta.ok) {
        /// significa login exitoso =)
        iniciarSesionContext(rpta.token);
        props.history.push("/pos/pedido")
      }
    })
  }

  return (
    <main className="container-fluid bg-dark login-screen">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="">Usuario</label>
                  <input type="text" placeholder="Ejm: jgarnica@mail.com"
                    className="form-control" id="correo" name="correo"
                    onChange={handleChange} value={formulario.correo}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" id="password"
                    className="form-control" onChange={handleChange}
                    value={formulario.password} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-dark">
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default AuthLoginScreen
