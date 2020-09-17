import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../../Shared/ErrorBoundary/ErrorBoundary'
import { Switch, Route } from 'react-router-dom';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';
import TopNavBar from '../../UI/Navbar/TopNavBar/TopNavbar'
import ReactNotification from 'react-notifications-component'
import Loading from '../../UI/Loading/Loading';

const AddNew = lazy(() => import('../AddNewColor/AddNew'));
const Setting = lazy(() => import('../Setting/Setting'))

const LoadingElement = <div className="text-center">
    <Loading show={true} style={{ width: '30px' }} />
</div>


const MainPanel = props => {
    return (
        <React.Fragment>
            <ReactNotification />
            <TopNavBar />
            <div className="container sans p-4 border mt-3">
                <ErrorBoundary>
                    <Suspense fallback={LoadingElement}>
                        <Switch>
                            <Route path="/addnew" render={() => <AddNew />} />
                            <Route path="/setting" render={() => <Setting />} />
                            <Route render={() => <ErrorPage />} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </div>
        </React.Fragment>
    )
}

export default MainPanel;