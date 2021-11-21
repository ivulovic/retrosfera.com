import { createSelector } from 'reselect';

export const stateName = 'auth';

// basic selectors
export const selectState = state => state[stateName];
export const selectInitializedAuth = state => state[stateName].initializedAuth;
export const selectIsUserAuthenticated = state =>
  state[stateName].isAuthenticated;
export const selectEmail = state => state[stateName].email;
export const selectUsername = state => state[stateName].username;
// memoize selectors

export const makeSelectIsSuperUser = createSelector(selectState, s =>
  s ? s.isSuperUser : false,
);
export const makeSelectIsUserAuthenticated = createSelector(
  selectIsUserAuthenticated,
  isAuthenticated => isAuthenticated,
);
export const makeSelectUserEmail = createSelector(selectEmail, res => res);
export const makeSelectUserUsername = createSelector(
  selectUsername,
  res => res,
);
export const makeSelectInitializedAuth = createSelector(
  selectInitializedAuth,
  initializedAuth => initializedAuth,
);
