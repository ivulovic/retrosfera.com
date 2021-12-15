import DataProvider from './DataProvider';
import { Route, Switch, useRouteMatch } from 'react-router';
import Graphics from './Content/Graphics';
import { CovidPageViewEnum } from './types';
import Ambulances from './Content/Ambulances';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Title from 'app/components/Title';
import './style.scss';

export default function CovidPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation();
  return (
    <main className="page-wrapper covid-page">
      <Title>{t('coronaVirus')}</Title>

      <div className="button-group">
        <NavLink exact activeClassName="active" to={`${path}`}>
          {t('graphicView')}
        </NavLink>
        <NavLink
          activeClassName="active"
          to={`${path}/${CovidPageViewEnum.Ambulances}`}
        >
          {t('ambulancesView')}
        </NavLink>
      </div>

      <DataProvider>
        <Switch>
          <Route exact path={`${path}`} component={Graphics} />
          <Route
            path={`${path}/${CovidPageViewEnum.Graphic}`}
            component={Graphics}
          />
          <Route
            path={`${path}/${CovidPageViewEnum.Ambulances}`}
            component={Ambulances}
          />
        </Switch>
      </DataProvider>
    </main>
  );
}
