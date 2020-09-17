import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { user } from '../../Services/User.service';
import MainPanel from '../MainPanel/MainPanel'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    let [loggedIn, handleCheckLogin] = useState(false)
    user.checkLogin().then((userData) => {
        if (userData) {
            handleCheckLogin(true)
        }
    })
    console.log()
    return (
        <Route {...rest} render={(props) => (
            loggedIn ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}