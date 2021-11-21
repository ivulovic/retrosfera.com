/*
 *
 * AuthProvider actions
 *
 */
import {
  AUTH_INIT,
  AUTH_UPDATE_USER_TOKEN_FOREVER,
  AUTH_SUCCESSFUL_LOGIN,
  AUTH_UPDATE_USER_HAVE_TOKEN,
  AUTH_USER_NO_TOKEN,
  AUTH_LOGOUT,
  CHANGE_USER_STATUS,
  TIME_ZONE_CHANGED,
  CHANGE_TIME_ZONE,
  AUTH_REGISTER,
  AUTH_LOGIN,
} from './constants';

/**
 * Dispatched when the component is mounted
 *
 * @return {object}      An action object with a type of AUTH_INIT
 */
export function initAuth() {
  return {
    type: AUTH_INIT,
  };
}

export function login(payload) {
  return {
    type: AUTH_LOGIN,
    payload,
  };
}

export function register(payload) {
  return {
    type: AUTH_REGISTER,
    payload,
  };
}

/**
 * Dispatched when `user` enters credentials and gets successful `response` from server
 *
 * @param  {object} data  All user information
 *
 * @return {object}       An action object with a type of AUTH_SUCCESSFUL_LOGIN passing the input params
 */
export function successfulLogin(data) {
  const initials = 'I.V.';
  const payload = { ...data, initials };
  return {
    type: AUTH_SUCCESSFUL_LOGIN,
    payload,
  };
}

/**
 * Dispatched when `auth token` is detected
 *  - its not automatic detection
 *  - when some listener figures out that there is auth token
 *  - something like `login, or refresh, etc...`
 *
 * @return {object}      An action object with a type of AUTH_INIT
 */
export function startCheckingAuthToken() {
  return {
    type: AUTH_UPDATE_USER_TOKEN_FOREVER,
  };
}

export function hasTokenButWaitingOnUserInformation() {
  return {
    type: AUTH_UPDATE_USER_HAVE_TOKEN,
  };
}

export function guestUser() {
  return {
    type: AUTH_USER_NO_TOKEN,
  };
}

export function logoutUser(sendRequestToTheServer = true) {
  return {
    type: AUTH_LOGOUT,
    payload: { sendRequest: sendRequestToTheServer },
  };
}

export const changeUserStatus = status => ({
  type: CHANGE_USER_STATUS,
  payload: status,
});

//
export const timeZoneChanged = timeZone => ({
  type: TIME_ZONE_CHANGED,
  payload: timeZone,
});

export const changeTimeZoneSettings = (timeZone, email) => ({
  type: CHANGE_TIME_ZONE,
  payload: { timeZone, email },
});
