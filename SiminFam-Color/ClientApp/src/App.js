import React from 'react';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import MainPanel from './Components/MainPanel/MainPanel'
import { Route } from 'react-router';
import Login from './Components/Login/Login'

function App() {
  return (
    <React.Fragment>
      <PrivateRoute exact path="/" component={<MainPanel />} />
      <Route path="/login" render={() => <Login />} />
    </React.Fragment>
  );
}

export default App;
