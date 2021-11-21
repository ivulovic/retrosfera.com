import { cookie as cookieSetting } from 'settings';
import {
  get as getCookie,
  set as setCookie,
  remove as removeCookie,
} from 'utils/cookie';

/**
 * This method is responsible for getting users token and checking if cookie hasn't expired
 */
export function getUserAuthToken() {
  const nowIsoString = new Date().toISOString();
  const expireIsoString = getCookie(cookieSetting.expirationName);

  return expireIsoString > nowIsoString
    ? getCookie(cookieSetting.name)
    : undefined;
}

/**
 * This method is responsible for setting cookie value as users token
 */
export function setUserAuthToken(token) {
  const expiresDate = new Date();
  expiresDate.setMinutes(expiresDate.getMinutes() + cookieSetting.expires);

  // problems with old application
  setCookie(cookieSetting.name, token);

  // expiration cookie
  setCookie(cookieSetting.expirationName, expiresDate.toISOString());
}

/**
 * This method is responsible for updating cookie `expiresDate`
 */
export function updateUserAuthToken(token) {
  // this two functions are same, but naming is different so in some scenarios
  // it's easier to find update and to know that this is doing update
  setUserAuthToken(token);
}

/**
 * This method is responsible for removing cookie
 */
export function removeUserAuthToken() {
  removeCookie(cookieSetting.name);
  removeCookie(cookieSetting.expirationName);
}

/**
 * This method is responsible for checking if auth token exists
 */
export function doesUserAuthTokenExists(token = undefined) {
  return (token || getUserAuthToken()) != null;
}

/**
 * This method is responsible for checking if auth token exists,
 * if exists, user is `logged in`
 *  - and update token, so it can't expire (if 2min left, it will expire before update can happen)
 * else, he is `anonymous`
 */
export function checkIfUserAuthTokenExistsAndUpdateIfItDoes() {
  const token = getUserAuthToken();
  const exists = doesUserAuthTokenExists(token);

  if (exists) {
    updateUserAuthToken(token);
  }

  return exists;
}
