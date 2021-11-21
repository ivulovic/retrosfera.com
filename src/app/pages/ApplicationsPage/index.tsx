import { makeSelectInitializedAuth, makeSelectIsUserAuthenticated } from 'app/providers/AuthProvider/selectors';
import { useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router';
import { NotAuthenticatedPage } from '../NotAuthenticated/Loadable';
import { NotFoundPage } from '../NotFoundPage';
import ApplicationMain from './Main';
import ApplicationOverview from './Overview';
import './style.scss';

export default function ApplicationsPage() {
  let { path } = useRouteMatch();
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  return (
    <div className="page-wrapper applications-page">
      <Switch>
        <Route 
          exact 
          path={path} 
          component={ApplicationOverview} 
        />
        {isUserLoggedIn && <Route 
          path={path + '/:applicationId'} 
          component={ApplicationMain} 
        />}
        <Route 
          component={NotAuthenticatedPage} 
        />
      </Switch>
    </div>
  );
}
