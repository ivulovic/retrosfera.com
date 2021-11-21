import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Switch, useRouteMatch } from 'react-router';
import { WISHLIST_SCOPE } from './constants';
import { wishlistsSaga } from './saga';
import { reducer } from './slice';
import './style.scss';

import WishlistOverview from './WishlistOverview';
import WishlistUserInfo from './WishlistUsersInfo';
import {
  makeSelectInitializedAuth,
  makeSelectIsUserAuthenticated,
} from 'app/providers/AuthProvider/selectors';
import { useSelector } from 'react-redux';
import PrivateRoute from 'app/components/Routes/PrivateRoute';
import PublicRoute from 'app/components/Routes/PublicRoute';

export default function WishlistPage(): JSX.Element {
  const { path } = useRouteMatch();
  useInjectReducer({ key: WISHLIST_SCOPE, reducer: reducer });
  useInjectSaga({ key: WISHLIST_SCOPE, saga: wishlistsSaga });
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  const isAuthInitialized = useSelector(makeSelectInitializedAuth);
  return (
    <>
      <Switch>
        <PrivateRoute
          isAuthenticated={isUserLoggedIn}
          isAuthReady={isAuthInitialized}
          exact
          path={path}
          component={WishlistOverview}
        />
        <PublicRoute
          path={path + '/users/:userId'}
          component={WishlistUserInfo}
        />
      </Switch>
    </>
  );
}
