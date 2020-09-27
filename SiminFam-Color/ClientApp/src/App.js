import React, { useEffect } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { Route, Switch, withRouter } from 'react-router';
import Login from './Components/Login/Login'
import ReactNotification from 'react-notifications-component'
import { user } from './Services/User.service';
import * as action from './Store/ActionCreators'
import { connect } from 'react-redux';

function App(props) {
  useEffect(() => {
    user.checkLogin().then(data => {
      if (data) {
        props.history.replace('/main/addnewcolor')
        props.storeUserData(data.data)
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
        <Route path="/main" component={ProtectedRoutes} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Login} />
      </Switch>
    </React.Fragment>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (value) => dispatch(action.storeUserData(value))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(App));
