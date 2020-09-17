import React from 'react';
import './NavBarItems.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { user } from '../../../Services/User.service';

const NavBarItems = props => {
    const logout = () => {
        user.logout().then(() => props.history.replace('/login'))
    }
    return (
        <React.Fragment>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle pointer"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ثبت
                        </a>
                <div className="dropdown-menu text-right" >
                    <NavLink className="dropdown-item" activeClassName="active" to={{
                        pathname: "/main/addnew"
                    }}>رنگ جدید</NavLink>
                </div>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="activeLink" exact to="/main/reports">گزارشات</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="activeLink" exact to="/main/setting">تنظیمات</NavLink>
            </li>
            <li className="nav-item">
                <a className="nav-link pointer" onClick={() => logout()}>خروج</a>
            </li>
        </React.Fragment>
    )
}

export default withRouter(NavBarItems);