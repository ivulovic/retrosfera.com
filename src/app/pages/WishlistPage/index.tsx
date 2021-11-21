import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Route, Switch, useRouteMatch} from 'react-router';
import { WISHLIST_SCOPE } from './constants';
import { wishlistsSaga } from './saga'; 
import { reducer } from './slice';
import './style.scss'; 

import WishlistOverview from './WishlistOverview';
import WishlistUserInfo from './WishlistUsersInfo';
import { makeSelectIsUserAuthenticated } from 'app/providers/AuthProvider/selectors';
import { useSelector } from 'react-redux';

export default function WishlistPage(): JSX.Element {
  const { path } = useRouteMatch();
  useInjectReducer({ key: WISHLIST_SCOPE, reducer: reducer });
  useInjectSaga({ key: WISHLIST_SCOPE, saga: wishlistsSaga });
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);

  return (
    <>
      <Switch>
        {isUserLoggedIn && <Route 
          exact 
          path={path} 
          component={WishlistOverview} 
        />}
        <Route 
          path={path + '/users/:userId'} 
          component={WishlistUserInfo} 
        />
      </Switch>
    </>
  );
}
