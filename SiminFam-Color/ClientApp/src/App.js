import React from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { Route, Switch, withRouter } from 'react-router';
import Login from './Components/Login/Login'
import ReactNotification from 'react-notifications-component'

function App(props) {
  return (
    <React.Fragment>
      <ReactNotification />
      <Switch>
        <Route path="/main" component={ProtectedRoutes} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default withRouter(App);
