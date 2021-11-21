/*
 *
 * AuthProvider constants
 *
 */
const scope = 'app/AuthProvider';

export const AUTH_LOGIN = `${scope}/AUTH_LOGIN`;
export const AUTH_REGISTER = `${scope}/AUTH_REGISTER`;

export const AUTH_INIT = `${scope}/AUTH_INIT`;
export const AUTH_UPDATE_USER_TOKEN_FOREVER = `${scope}/AUTH_UPDATE_USER_TOKEN_FOREVER`;

export const AUTH_SUCCESSFUL_LOGIN = `${scope}/AUTH_SUCCESSFUL_LOGIN`;
export const AUTH_LOGOUT = `${scope}/AUTH_LOGOUT`;

// This is used when user have token to communicate with API but there is no data
export const AUTH_UPDATE_USER_HAVE_TOKEN = `${scope}/USER_HAVE_TOKEN`;
export const AUTH_USER_NO_TOKEN = `${scope}/USER_NO_TOKEN`;

// user status
export const CHANGE_USER_STATUS = `${scope}/CHANGE_USER_STATUS`;

// time zone
export const TIME_ZONE = `TIME_ZONE`;
export const CHANGE_TIME_ZONE = `${scope}/CHANGE_TIME_ZONE`;
export const TIME_ZONE_CHANGED = `${scope}/TIME_ZONE_CHANGED`;
