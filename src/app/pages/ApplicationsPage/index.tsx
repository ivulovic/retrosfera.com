import { Switch, Route, useRouteMatch } from 'react-router';
import ApplicationDetails from './Details';
import ApplicationOverview from './Overview';
import './style.scss';

export default function ApplicationsPage(){
  let { path } = useRouteMatch();

  return <div className="page-wrapper applications-page">
    <Switch>
      <Route exact path={path} component={ApplicationOverview} />
      <Route path={path + '/:applicationId'} component={ApplicationDetails} />
    </Switch>
  </div>
}