import PrivateRoute from 'app/components/Routes/PrivateRoute';
import PublicRoute from 'app/components/Routes/PublicRoute';
import {
  makeSelectInitializedAuth,
  makeSelectIsUserAuthenticated,
} from 'app/providers/AuthProvider/selectors';
import { useSelector } from 'react-redux';
import { Switch, useRouteMatch } from 'react-router';
import ApplicationMain from './Main';
import ApplicationOverview from './Overview';
import './style.scss';

export default function ApplicationsPage() {
  let { path } = useRouteMatch();
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  const isAuthInitialized = useSelector(makeSelectInitializedAuth);
  return (
    <div className="page-wrapper applications-page">
      <Switch>
        <PublicRoute exact path={path} component={ApplicationOverview} />
        <PrivateRoute
          isAuthenticated={isUserLoggedIn}
          isAuthReady={isAuthInitialized}
          path={path + '/:applicationId'}
          component={ApplicationMain}
        />
      </Switch>
    </div>
  );
}
