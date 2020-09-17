import React, { useEffect } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { Route, Switch, withRouter } from 'react-router';
import Login from './Components/Login/Login'
import ReactNotification from 'react-notifications-component'
import { user } from './Services/User.service';

function App(props) {
  useEffect(() => {
    user.checkLogin().then(data => {
      if (data) {
        props.history.replace('/main/addnew')
      } else {
        user.logout()
        props.history.replace('/login')
      }
    })
  }, [])

  return (
    <React.Fragment>
      <ReactNotification />
      <Switch>
        <Route path="/main" render={() => <ProtectedRoutes />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/" render={() => <Login />} />
      </Switch>
    </React.Fragment>
  );
}

export default withRouter(App);
