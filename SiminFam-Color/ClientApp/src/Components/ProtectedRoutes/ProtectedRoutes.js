import React, { lazy, Suspense, useEffect } from 'react';
import ErrorBoundary from '../../Shared/ErrorBoundary/ErrorBoundary'
import { Switch, Route, withRouter } from 'react-router-dom';
import TopNavBar from '../../UI/Navbar/TopNavBar/TopNavbar'
import Loading from '../../UI/Loading/Loading';

const AddNew = lazy(() => import('../AddNew/AddNew'));
const AddNewColor = lazy(() => import('../AddNewColor/AddNewColor'));
const Setting = lazy(() => import('../Setting/Setting'))
const ErrorPage = lazy(() => import('../../Shared/ErrorPage/ErrorPage'))

const LoadingElement = <div className="text-center">
    <Loading show={true} style={{ width: '30px' }} />
</div>


const ProtectedRoutes = props => {

    return (
        <React.Fragment>
            <TopNavBar />
            <div className="container sans p-4 border mt-3">
                <ErrorBoundary>
                    <Suspense fallback={LoadingElement}>
                        <Switch>
                            <Route path="/main/addnew" component={AddNew} />
                            <Route path="/main/addnewcolor" component={AddNewColor} />
                            <Route path="/main/setting" component={Setting} />
                            <Route component={ErrorPage} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </div>
        </React.Fragment>
    )
}


export default withRouter(ProtectedRoutes);