import React from 'react';
import './NavBarItems.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { user } from '../../../Services/User.service';

const NavBarItems = props => {
    const logout = () => {
        user.logout().then(() => props.history.replace('/'))
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
                        pathname: "/addnew"
                    }}>رنگ جدید</NavLink>
                </div>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="activeLink" exact to="/reports">گزارشات</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="activeLink" exact to="/setting">تنظیمات</NavLink>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={() => logout()}>خروج</a>
            </li>
        </React.Fragment>
    )
}

export default withRouter(NavBarItems);