import { Switch, useRouteMatch } from 'react-router';
import {
  makeSelectInitializedAuth,
  makeSelectIsUserAuthenticated,
} from 'app/providers/AuthProvider/selectors';
import { useSelector } from 'react-redux';
import PrivateRoute from 'app/components/Routes/PrivateRoute';
import OverviewPage from './Overview';
import DetailsPage from './Details';
import TickerList from './ticker-list';
import { symbolsList } from './data';
import RealTimeDataProvider from './RealTimeDataProvider';

export default function CryptoExchangePage(): JSX.Element {
  const { path } = useRouteMatch();
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  const isAuthInitialized = useSelector(makeSelectInitializedAuth);
  return (
    <RealTimeDataProvider symbolsList={symbolsList}>
      <TickerList symbolsList={symbolsList} />
      <Switch>
        <PrivateRoute
          isAuthenticated={isUserLoggedIn}
          isAuthReady={isAuthInitialized}
          exact
          path={path}
          component={OverviewPage}
        />
        <PrivateRoute
          isAuthenticated={isUserLoggedIn}
          isAuthReady={isAuthInitialized}
          path={path + '/:symbol'}
          component={DetailsPage}
        />
      </Switch>
    </RealTimeDataProvider>
  );
}
