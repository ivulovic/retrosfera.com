import produce from 'immer';
import {
  AUTH_SUCCESSFUL_LOGIN,
  AUTH_LOGOUT,
  AUTH_UPDATE_USER_HAVE_TOKEN,
  AUTH_USER_NO_TOKEN,
} from './constants';

export const initialState = {
  user: null,
  isLoading: false,
  initializedAuth: false,
  isAuthenticated: false,
};

/* eslint-disable no-param-reassign */
/* eslint-disable default-case  */
/* eslint-disable no-return-assign */
const authProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_USER_NO_TOKEN:
        draft.initializedAuth = true;
        draft.isAuthenticated = false;
        break;

      case AUTH_UPDATE_USER_HAVE_TOKEN:
        draft.initializedAuth = true;
        draft.isAuthenticated = true;
        break;

      case AUTH_SUCCESSFUL_LOGIN: {
        return {
          ...action.payload,
          token: null,
          initializedAuth: true,
          isAuthenticated: true,
          isSuperUser: action.payload.role === 'ADMIN',
        };
      }

      case AUTH_LOGOUT: {
        return {
          ...initialState,
          initializedAuth: true,
        };
      }

      // case ACCOUNT_UPDATED: {
      //   const { payload } = action;
      //   draft.user = { ...payload };
      //   break;
      // }
    }
  });

export default authProviderReducer;
