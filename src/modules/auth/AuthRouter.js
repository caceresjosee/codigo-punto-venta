import React from 'react'
import { Switch, Route } from "react-router-dom";
import AuthLoginScreen from './screens/login/AuthLoginScreen';
import AuthRegisterScreen from './screens/register/AuthRegisterScreen';

const AuthRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/auth/login" component={AuthLoginScreen} />
        <Route path="/auth/register" component={AuthRegisterScreen} />
      </Switch>
    </>
  )
}

export default AuthRouter
