import React, { Suspense, lazy } from 'react';
import Loading from './UI/Loading/Loading'
import TopNavBar from './UI/Navbar/TopNavBar/TopNavbar'
import ErrorBoundary from './Shared/ErrorBoundary/ErrorBoundary'
import { Switch, Route, Router } from 'react-router-dom';
import ErrorPage from './Shared/ErrorPage/ErrorPage';

const AddNew = lazy(() => import('./Components/AddNewColor/AddNew'));
const Setting = lazy(() => import('./Components/Setting/Setting'))

const LoadingElement = <div className="text-center">
  <Loading show={true} style={{ width: '30px' }} />
</div>

function App() {
  return (
    <React.Fragment>
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
  );
}

export default App;
