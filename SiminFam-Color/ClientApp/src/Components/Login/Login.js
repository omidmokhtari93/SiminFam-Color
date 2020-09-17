import React, { useState } from 'react';
import './Login.scss'
import logo from '../../Assets/images/logo.png'
import { user } from '../../Services/User.service';
import { Redirect, withRouter } from 'react-router';

const Login = props => {
    let [userData, handleChange] = useState({ Username: '', Password: '' })
    const loginUser = e => {
        e.preventDefault();
        user.login(userData).then(loggedIn => {
            if (loggedIn) {
                return <Redirect to='/' />
            }
        })
    }

    return (
        <div className="text-center rtl sans login">
            <form className="form-signin">
                <img className="mb-4" src={logo} alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">ورود به سیستم</h1>
                <label htmlFor="inputEmail" className="sr-only">نام کاربری</label>
                <input type="email" className="form-control" placeholder="نام کاربری"
                    onChange={e => handleChange({ ...userData, Username: e.target.value })} />
                <label htmlFor="inputPassword" className="sr-only">رمز عبور</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="رمز عبور"
                    onChange={e => handleChange({ ...userData, Password: e.target.value })} />
                <button className="btn btn-lg btn-primary btn-block" type="submit"
                    onClick={loginUser}>ورود</button>
                <p className="mt-5 mb-3 text-muted unit">تهیه شده توسط واحد نرم افزار</p>
            </form>
        </div>
    )
}

export default withRouter(Login);