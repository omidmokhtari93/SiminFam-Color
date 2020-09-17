import React, { useEffect } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { Route, Switch, withRouter } from 'react-router';
import Login from './Components/Login/Login'
import ReactNotification from 'react-notifications-component'
import { user } from './Services/User.service';
import { connect } from 'react-redux'
import * as action from './Store/ActionCreators'

function App(props) {
  useEffect(() => {
    user.checkLogin().then(data => {
      if (data) {
        props.history.replace('/main/addnew')
        props.storeUserData(data)
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
        <Route path="/" exact render={() => <Login />} />
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.user.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: () => dispatch(action.storeUserData)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
