import { Switch, useRouteMatch } from 'react-router';
import {
  makeSelectInitializedAuth,
  makeSelectIsUserAuthenticated,
} from 'app/providers/AuthProvider/selectors';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from 'app/components/Routes/PrivateRoute';
import OverviewPage from './Overview';
import DetailsPage from './Details';
import TickerList from './ticker-list';
import RealTimeDataProvider from './RealTimeDataProvider';
import { useInjectReducer } from 'redux-injectors';
import { useInjectSaga } from 'utils/redux-injectors';
import { CRYPTOEXCHANGE_SCOPE, SELECTED_ITEMS_KEY } from './constants';
import { cryptoexchangeSaga } from './saga';
import { actions, reducer } from './slice';
import ConfigurationPage from './Configuration';
import { useEffect, useState } from 'react';
import { selectAvailableSymbols, selectLastUpdate } from './selectors';
import { getLocalDbData } from 'utils/localdb';

export default function CryptoExchangePage(): JSX.Element {
  useInjectReducer({ key: CRYPTOEXCHANGE_SCOPE, reducer: reducer });
  useInjectSaga({ key: CRYPTOEXCHANGE_SCOPE, saga: cryptoexchangeSaga });
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [state, setState] = useState<Array<string>>([]);
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  const isAuthInitialized = useSelector(makeSelectInitializedAuth);
  const availableSymbols = useSelector(selectAvailableSymbols);
  const lastUpdate = useSelector(selectLastUpdate);

  useEffect(() => {
    async function asyncInit() {
      const items = await getLocalDbData(SELECTED_ITEMS_KEY);
      const symbols = availableSymbols.map(s => ({
        id: s,
        checked: items?.[s]?.checked || false,
      }));
      const tickerSymbols: Array<string> = [];
      for (let i = 0; i < symbols.length; i++) {
        if (symbols[i].checked) {
          tickerSymbols.push(`t${symbols[i].id}`);
        }
      }
      setState(tickerSymbols);
    }

    if (availableSymbols) {
      asyncInit();
    }
  }, [availableSymbols, lastUpdate]);

  useEffect(() => {
    dispatch(actions.loadAvailableSymbols());
    return () => {
      dispatch(actions.clearCryptoexchangePageState());
    };
  }, []);

  return (
    <RealTimeDataProvider symbolsList={state}>
      <TickerList />
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
          path={path + '/configuration'}
          component={ConfigurationPage}
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
