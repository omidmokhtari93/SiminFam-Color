import React from 'react';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import MainPanel from './Components/MainPanel/MainPanel'
import { Route } from 'react-router';
import Login from './Components/Login/Login'
import ReactNotification from 'react-notifications-component'

function App() {
  return (
    <React.Fragment>
      <ReactNotification />
      <PrivateRoute path="/" exact component={<MainPanel />} />
      <Route path="/login" render={() => <Login />} />
    </React.Fragment>
  );
}

export default App;
