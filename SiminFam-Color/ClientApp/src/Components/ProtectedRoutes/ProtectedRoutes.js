import React, { lazy, Suspense, useEffect } from 'react';
import ErrorBoundary from '../../Shared/ErrorBoundary/ErrorBoundary'
import { Switch, Route, withRouter } from 'react-router-dom';
import TopNavBar from '../../UI/Navbar/TopNavBar/TopNavbar'
import Loading from '../../UI/Loading/Loading';
import { user } from '../../Services/User.service';
import * as action from '../../Store/ActionCreators'
import { connect } from 'react-redux';

const AddNew = lazy(() => import('../AddNewColor/AddNew'));
const Setting = lazy(() => import('../Setting/Setting'))
const ErrorPage = lazy(() => import('../../Shared/ErrorPage/ErrorPage'))

const LoadingElement = <div className="text-center">
    <Loading show={true} style={{ width: '30px' }} />
</div>


const ProtectedRoutes = props => {
    useEffect(() => {
        user.checkLogin().then(data => {
            if (data) {
                props.history.replace('/main/addnew')
                props.storeUserData(data.data)
            } else {
                user.logout()
                props.history.replace('/login')
            }
        })
    }, [])
    return (
        <React.Fragment>
            <TopNavBar />
            <div className="container sans p-4 border mt-3">
                <ErrorBoundary>
                    <Suspense fallback={LoadingElement}>
                        <Switch>
                            <Route path="/main/addnew" component={AddNew} />
                            <Route path="/main/setting" component={Setting} />
                            <Route component={ErrorPage} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </div>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        storeUserData: (value) => dispatch(action.storeUserData(value))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(ProtectedRoutes));