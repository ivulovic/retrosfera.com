import PublicRoute from 'app/components/Routes/PublicRoute';
import { Switch, useRouteMatch } from 'react-router';
import ApplicationMain from './Main';
import ApplicationOverview from './Overview';
import './style.scss';

export default function ApplicationsPage() {
  let { path } = useRouteMatch();
  return (
    <div className="page-wrapper applications-page">
      <Switch>
        <PublicRoute exact path={path} component={ApplicationOverview} />
        <PublicRoute
          path={path + '/:applicationId'}
          component={ApplicationMain}
        />
      </Switch>
    </div>
  );
}
