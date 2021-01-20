import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";
import AuthState from './context/auth/authState';
import AdminRouter from './modules/admin/AdminRouter';
import AuthRouter from './modules/auth/AuthRouter';
import PosRouter from './modules/pos/PosRouter';
import Private from './Private';
const App = () => {
  return (
    <HashRouter>
      <AuthState>
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Private path="/pos" component={PosRouter} />
          <Private path="/admin" component={AdminRouter} />
        </Switch>
      </AuthState>
    </HashRouter>
  )
}

export default App
