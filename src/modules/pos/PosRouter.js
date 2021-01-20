import React from 'react'
import { Switch, Route } from "react-router-dom";
import PosState from '../../context/pos/posState';
import PosPedidoScreen from './screens/pedido/PosPedidoScreen';
const PosRouter = () => {
  return (
    <PosState>
      <Switch>
        <Route path="/pos/pedido" component={PosPedidoScreen} />
      </Switch>
    </PosState>

  )
}

export default PosRouter
