import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { user } from '../../Services/User.service';
import MainPanel from '../MainPanel/MainPanel'

export const PrivateRoute = ({ component: Component, ...rest }) => {

    const check = user.checkLogin()

    return (
        <Route {...rest} render={props => (
            false ? <MainPanel {...props} />
                : <Redirect to={{ pathname: '/login' }} />
        )} />
    )
}

// window.btoa('test' + ':' + 'test')

// window.atob('dGVzdDp0ZXN0')