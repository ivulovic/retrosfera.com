import Cookies from 'universal-cookie';
import { cookie as cookieSetting } from 'settings';

const cookiesProvider = new Cookies();

// the default settings
const hostName = window.location.hostname;

// Path that goes into the options object
const path = '/';

/**
 * This method is responsible for getting the domain name
 */
export function getDomainName() {
  return hostName.substring(
    hostName.lastIndexOf('.', hostName.lastIndexOf('.') - 1) + 1,
  );
}

/**
 * This method is responsible for setting the default cookie values
 */
const defaultCookieOptions = () => {
  const expiresDate = new Date();
  expiresDate.setMinutes(expiresDate.getMinutes() + cookieSetting.expires);

  return {
    expires: expiresDate,
    domain: getDomainName(),
    path,
  };
};

/**
 * This method is responsible for getting cookie
 */
export function get(key, inputOptions = { doNotParse: true }) {
  return cookiesProvider.get(key, inputOptions);
}

/**
 * This method is responsible for removing cookie
 * Had to add the options object, otherwise it works only for local environment
 */
export function remove(key, inputOptions = { path, domain: getDomainName() }) {
  cookiesProvider.remove(key, inputOptions);
}

/**
 * This method is responsible for setting cookie with default values which can be overriden
 */
export function set(key, value, inputOptions = {}) {
  const options = {
    ...defaultCookieOptions(),
    ...inputOptions,
  };
  cookiesProvider.set(key, value, options);
}

export default cookiesProvider;
