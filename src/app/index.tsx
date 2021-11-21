/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import SettingsPage from './pages/SettingsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import { RegisterPage } from './pages/AuthPage/RegisterPage';
import { LoginPage } from './pages/AuthPage/LoginPage';
import LogoutPage from './pages/AuthPage/LogoutPage';
import { useSelector } from 'react-redux';
import {
  makeSelectIsUserAuthenticated,
} from './providers/AuthProvider/selectors';

export function App() {
  const { i18n } = useTranslation();
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  // const isAuthInitialized = useSelector(makeSelectInitializedAuth);
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Ретросфера"
        defaultTitle="Ретросфера"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Header />

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} render={() => {
          return <div className="page-wrapper"><p>Home</p></div>
        }} />
        <Route
          path={process.env.PUBLIC_URL + '/applications'}
          component={ApplicationsPage}
        />
        <Route
          path={process.env.PUBLIC_URL + '/settings'}
          component={SettingsPage}
        />
        {!isUserLoggedIn && <>
          <Route path={process.env.PUBLIC_URL + '/login'} component={LoginPage} />
          <Route
          path={process.env.PUBLIC_URL + '/register'}
          component={RegisterPage}
        />
        </>}
        {isUserLoggedIn && <>
          <Route path={process.env.PUBLIC_URL + '/logout'} component={LogoutPage} />
        </>}
       
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
