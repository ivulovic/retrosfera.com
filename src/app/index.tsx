import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { NotFoundPage } from 'app/pages/NotFoundPage/Loadable';
import SettingsPage from 'app/pages/SettingsPage';
import ApplicationsPage from 'app/pages/ApplicationsPage';
import { RegisterPage } from 'app/pages/AuthPage/RegisterPage';
import { LoginPage } from 'app/pages/AuthPage/LoginPage';
import LogoutPage from 'app/pages/AuthPage/LogoutPage';
import { useSelector } from 'react-redux';
import {
  makeSelectInitializedAuth,
  makeSelectIsUserAuthenticated,
} from 'app/providers/AuthProvider/selectors';
import PublicRoute from 'app/components/Routes/PublicRoute';
import HomePage from 'app/pages/HomePage';
import PrivateRoute from 'app/components/Routes/PrivateRoute';
import OnlyPublicRoute from 'app/components/Routes/OnlyPublicRoute';
import SearchPage from 'app/pages/SearchPage';
import BasicLayout from 'app/layouts/BasicLayout';
import DefaultLayout from 'app/layouts/DefaultLayout';
import Covid19Page from './pages/Covid19Page';
import AirQualityPage from './pages/AirQualityPage';

export function App() {
  const { i18n } = useTranslation();
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  const isAuthInitialized = useSelector(makeSelectInitializedAuth);
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Ретросфера"
        defaultTitle="Ретросфера"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Ретросфера" />
      </Helmet>
      <Switch>
        <PublicRoute
          exact={true}
          layout={BasicLayout}
          component={HomePage}
          path={process.env.PUBLIC_URL + '/'}
        />
        <PublicRoute
          layout={DefaultLayout}
          component={Covid19Page}
          path={process.env.PUBLIC_URL + '/covid19'}
        />
        <PublicRoute
          layout={DefaultLayout}
          component={AirQualityPage}
          path={process.env.PUBLIC_URL + '/air-quality'}
        />
        <PublicRoute
          layout={DefaultLayout}
          component={SearchPage}
          path={process.env.PUBLIC_URL + '/search'}
        />
        <PublicRoute
          layout={DefaultLayout}
          component={ApplicationsPage}
          path={process.env.PUBLIC_URL + '/applications'}
        />
        <PublicRoute
          layout={DefaultLayout}
          path={process.env.PUBLIC_URL + '/settings'}
          component={SettingsPage}
        />
        <OnlyPublicRoute
          layout={DefaultLayout}
          isAuthenticated={isUserLoggedIn}
          isAuthReady={isAuthInitialized}
          path={process.env.PUBLIC_URL + '/login'}
          component={LoginPage}
        />
        {/* <OnlyPublicRoute
          layout={BasicLayout}
          isAuthenticated={isUserLoggedIn}
          isAuthReady={isAuthInitialized}
          path={process.env.PUBLIC_URL + '/register'}
          component={RegisterPage}
        /> */}
        <PrivateRoute
          layout={BasicLayout}
          isAuthenticated={isUserLoggedIn}
          isAuthReady={isAuthInitialized}
          path={process.env.PUBLIC_URL + '/logout'}
          component={LogoutPage}
        />
        <PublicRoute layout={DefaultLayout} component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
