import {
  all,
  call,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { setLocalDbData } from 'utils/localdb';
import { request, makeApiUrl, makePostReq, makeGetReq } from 'utils/request';
import { errorNotification } from 'utils/notifications';

import { cookie as cookieSetting } from 'settings';
import { handleApiError } from 'app/providers/NotificationProvider/saga';
import {
  AUTH_INIT,
  AUTH_UPDATE_USER_TOKEN_FOREVER,
  AUTH_SUCCESSFUL_LOGIN,
  AUTH_LOGOUT,
  CHANGE_TIME_ZONE,
  TIME_ZONE,
  AUTH_REGISTER,
  AUTH_LOGIN,
} from './constants';
import {
  startCheckingAuthToken,
  hasTokenButWaitingOnUserInformation,
  guestUser,
  successfulLogin,
  timeZoneChanged,
  logoutUser,
  login,
} from './actions';
import {
  checkIfUserAuthTokenExistsAndUpdateIfItDoes,
  getUserAuthToken,
  setUserAuthToken,
  removeUserAuthToken,
  updateUserAuthToken,
} from './authCookieUtil';

//
// This is `update Auth Token emitter`
// he is going to hold unsubscribe method
// if user logout, we need to `unsubscribe` from this listener
// and everything should be ok
let updateAuthTokenEmitter = null;

/**
 * This method is responsible to update users token every `x` min
 * - users token = cookie
 */
function updateAuthTokenLooper() {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      //
      // this is updating token
      const token = getUserAuthToken();
      setUserAuthToken(token);
      emitter(true);
    }, cookieSetting.refresh * 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}

/**
 *
 * This method should be triggered when AUTH_INIT arrives
 * so it can check if there is cookie had been set
 *
 * Idea is, first check if cookie exists
 *  - if exists, setup AUTH_CHECK_TOKEN event
 *  - else, wait until user logs in
 *      - first take users data
 */
export function* setupAuthProvider() {
  try {
    const res = yield call(
      request,
      makeApiUrl('/auth/account/info'),
      makeGetReq(),
    );
    yield put(successfulLogin(res));
  } catch (e) {
    /** prettier-ignore */
  }
  // const token = getUserAuthToken();
  // console.log(token);
  // if (token) {
  //   // update token
  //   updateUserAuthToken(token);

  //   // notify reducer that user is logged in but waiting on user information
  //   yield put(hasTokenButWaitingOnUserInformation());

  //   // yield put(startLoader());
  //   try {
  //     // api call
  //     const res = yield call(
  //       request,
  //       makeApiUrl('/auth/account/info'),
  //       makeGetReq(),
  //     );
  //     // TODO: fetch applications
  //     yield put(successfulLogin(res));
  //     // ws auth
  //   } catch (e) {
  //     console.log({ e });
  //     // handle errror
  //     if (!e.response.ok) {
  //       yield put(logoutUser());
  //     }
  //     // yield handleApiError(e, errorNotification);
  //   }

  //   return;
  // }

  // guest user
  // yield put(guestUser());
}

/**
 * This method should be triggered when AUTH_INIT arrives
 */
export function* updateAuthTokenForever() {
  // console.log('Starts cookie update forever.');
  updateAuthTokenEmitter = yield call(updateAuthTokenLooper);
  try {
    while (updateAuthTokenEmitter !== null) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      yield take(updateAuthTokenEmitter);
      // const updated = yield take(updateAuthTokenEmitter);
      // console.log(`Users Token Updated: ${updated}`);
    }
  } catch (e) {
    yield handleApiError(e, errorNotification);
  } finally {
    console.log('Finished with checking auth token.');
  }
}

/**
 * This method should be triggered when AUTH_INIT arrives
 */
export function* updateOnSuccessfulLogin(action) {
  // CRYPTO
  // const { session } = action.payload;
  // if (session) setUserAuthToken(session);
  // yield put(startCheckingAuthToken());
  const { token } = action.payload;

  if (token) setUserAuthToken(token);
  yield put(startCheckingAuthToken());

  // only place where we have JWT to fetch applications
  // fetch init data
}

/**
 * This method should be triggered when AUTH_LOGOUT arrives
 */
export function* unsubscribeAuthTokenEmitter(action) {
  // reset emitter
  if (updateAuthTokenEmitter) {
    updateAuthTokenEmitter.close();
    updateAuthTokenEmitter = null;
  }

  try {
    const { payload } = action;
    const { sendRequest } = payload;
    //
    const tokenExist = checkIfUserAuthTokenExistsAndUpdateIfItDoes();
    if (tokenExist && sendRequest) {
      // yield call(request, makeApiUrl('/api/user/logout'), makePostReq());
    }

    // unsubscribe from account
    // yield put(unsubscribeFromAccountBalance());
  } catch (e) {
    // errorNotification(buildMessageFromDev('commonMessages.errorOccurred'));
    console.log('logout failed...');
  } finally {
    // clear cookies
    removeUserAuthToken();
  }
}

/**
 * @desc Function name - resolveChangeTimeZone
 *
 * @param {object} action - If `timeZone` is not from local storage, we save it there.
 */
export function* resolveChangeTimeZone(action) {
  const { timeZone, isFromStorage, email } = action.payload;

  if (!isFromStorage)
    yield call(setLocalDbData, `${email}|${TIME_ZONE}`, timeZone);

  // save in redux
  yield put(timeZoneChanged(timeZone));
}

function* resolveLogin(action) {
  try {
    const { payload } = action;
    const content = yield call(
      request,
      makeApiUrl('/auth/account/login'),
      makePostReq(payload),
    );
    if (content && content.status !== 404) {
      yield put(successfulLogin(content));
    }
  } catch (e) {
    yield handleApiError(e, errorNotification);
  }
}

function* resolveRegister(action) {
  try {
    const { payload } = action;
    yield call(
      request,
      makeApiUrl('/auth/account/register'),
      makePostReq(payload),
    );
    yield put(login({ email: payload.email, password: payload.password }));
    // successNotification(buildMessageFromDev('messages.registered'));
  } catch (e) {
    yield handleApiError(e, errorNotification);
  }
}

//
// This is root listener for event
export default function* getAuthListeners() {
  yield all([
    takeLatest(AUTH_LOGIN, resolveLogin),
    takeLatest(AUTH_REGISTER, resolveRegister),
    takeLatest(AUTH_INIT, setupAuthProvider),
    takeLatest(AUTH_UPDATE_USER_TOKEN_FOREVER, updateAuthTokenForever),
    takeLatest(AUTH_SUCCESSFUL_LOGIN, updateOnSuccessfulLogin),
    takeLatest(AUTH_LOGOUT, unsubscribeAuthTokenEmitter),
    //
    takeEvery(CHANGE_TIME_ZONE, resolveChangeTimeZone),
  ]);
}
