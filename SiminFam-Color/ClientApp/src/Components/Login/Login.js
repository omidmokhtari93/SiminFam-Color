import React, { useState } from 'react';
import './Login.scss'
import logo from '../../Assets/images/logo.png'
import { user } from '../../Services/User.service';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as action from '../../Store/ActionCreators';
import Loading from '../../UI/Loading/Loading';

const Login = props => {
    let [userData, handleChange] = useState({ Username: '', Password: '' })
    let [show, showLoading] = useState(false);
    const loginUser = e => {
        e.preventDefault();
        showLoading(true)
        user.login(userData).then(data => {
            if (data.user) {
                showLoading(false)
                props.storeUserData(data.user)
                props.history.replace('/main/addnew')
            } else {
                showLoading(false)
            }
        })
    }

    return (
        <div className="text-center rtl sans login">
            <form className="form-signin">
                <img className="mb-4" src={logo} alt="" width="72" height="72" />
                <h3 className="h5 mb-3 font-weight-normal">ورود به سیستم</h3>
                <label htmlFor="inputEmail" className="sr-only">نام کاربری</label>
                <input type="email" className="form-control" placeholder="نام کاربری"
                    onChange={e => handleChange({ ...userData, Username: e.target.value })} />
                <label htmlFor="inputPassword" className="sr-only">رمز عبور</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="رمز عبور"
                    onChange={e => handleChange({ ...userData, Password: e.target.value })} />
                <button className="btn btn-lg btn-primary btn-block position-relative" type="submit"
                    onClick={loginUser}>ورود</button>
                <div className="position-relative mt-2">
                    <Loading show={show} style={{ top: '10px', width: '25px' }} />
                </div>
                <p className="mt-5 mb-3 text-muted unit">تهیه شده توسط واحد نرم افزار</p>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        storeUserData: (value) => dispatch(action.storeUserData(value))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));