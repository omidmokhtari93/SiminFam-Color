import React, { useEffect, lazy } from 'react';
import { Route, withRouter, useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

const Product = lazy(() => import('./ProductType/ProductType'));

const Setting = props => {
    let history = useHistory();
    useEffect(() => {
        history.push(props.match.path + '/type')

        return () => {
            console.log('Remove effects')
        }
    }, [])
    return (
        <React.Fragment>
            <ul className="nav nav-tabs rtl" id="myTab" role="tablist">
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/setting/type">نوع محصول</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/setting/company">نام شرکت</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/setting/color">رنگ</NavLink>
                </li>
            </ul>
            <div className="tab-content card-body text-right rtl border-left border-bottom border-right">
                <Route exact path="/setting/type" render={() => <Product />} />
                <Route exact path="/setting/company" render={() => <div>Company</div>} />
                <Route exact path="/setting/color" render={() => <div>Color</div>} />
            </div>
        </React.Fragment>
    )
}

export default withRouter(Setting);