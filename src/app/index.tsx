/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import SettingsPage from './pages/SettingsPage';
import ApplicationsPage from './pages/ApplicationsPage';

export function App() {
  const { i18n } = useTranslation();
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
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route path={process.env.PUBLIC_URL + '/applications'} component={ApplicationsPage} />
        <Route path={process.env.PUBLIC_URL + '/settings'} component={SettingsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
