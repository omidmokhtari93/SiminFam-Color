import React, { useEffect, lazy } from 'react';
import { Route, withRouter, useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

const Product = lazy(() => import('./ProductType/ProductType'));
const AddCompany = lazy(() => import('./AddCompany/AddCompany'));
const AddColor = lazy(() => import('./AddColor/AddColor'));

const Setting = props => {
    let history = useHistory();
    useEffect(() => {
        history.push(props.match.path + '/type')

        return () => {
            //console.log('Remove effects')
        }
    }, [])
    return (
        <React.Fragment>
            <ul className="nav nav-tabs rtl" id="myTab" role="tablist">
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/main/setting/type">نوع محصول</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/main/setting/company">نام شرکت</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/main/setting/color">رنگ</NavLink>
                </li>
            </ul>
            <div className="tab-content card-body text-right rtl border-left border-bottom border-right bg-white">
                <Route exact path="/main/setting/type" render={() => <Product />} />
                <Route exact path="/main/setting/company" render={() => <AddCompany />} />
                <Route exact path="/main/setting/color" render={() => <AddColor />} />
            </div>
        </React.Fragment>
    )
}

export default withRouter(Setting);