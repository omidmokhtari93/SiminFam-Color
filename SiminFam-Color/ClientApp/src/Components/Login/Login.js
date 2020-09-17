import React from 'react';
import './Login.scss'
import logo from '../../Assets/images/logo.png'

const Login = props => {

    const loginUser = e => {
        e.preventDefault();
        console.log('login')
    }

    return (
        <div className="text-center rtl sans login">
            <form className="form-signin">
                <img className="mb-4" src={logo} alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">ورود به سیستم</h1>
                <label htmlFor="inputEmail" className="sr-only">نام کاربری</label>
                <input type="email" className="form-control" placeholder="نام کاربری" />
                <label htmlFor="inputPassword" className="sr-only">رمز عبور</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="رمز عبور" />
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={loginUser}>ورود</button>
                <p className="mt-5 mb-3 text-muted unit">تهیه شده توسط واحد نرم افزار</p>
            </form>
        </div>
    )
}

export default Login;