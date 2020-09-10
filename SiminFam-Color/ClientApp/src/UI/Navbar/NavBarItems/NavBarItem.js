import React from 'react';
import './NavBarItems.scss';
import { NavLink } from 'react-router-dom';

const NavBarItems = props => {
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
        </React.Fragment>
    )
}

export default NavBarItems;