/**
 * This utility is just a wrapper around `localforage`
 * so we can call it normally inside saga's
 *
 * Without this wrapper, functions can break for some reason
 */
import localForage from 'localforage';

/**
 * @docs FrontEnd // Utils // localDb
 * @desc getLocalDbData -  This method is wrapper for getting data from `indexedDb/localStorage`
 *
 * @param {string} key - Key that is going to be fetched from browser `database`
 * @returns {Promise} The Promise that `saga` can later process/call easily
 */
export const getLocalDbData = key =>
  localForage
    .getItem(key)
    .then(result => result)
    .catch(reason => reason);

/**
 * @docs FrontEnd // Utils // localDb
 * @desc setLocalDbData -  This method is wrapper for setting data into `indexedDb/localStorage`
 *
 * @param {string} key - Key that is going to be inserted into browser's `database`
 * @param {any} value - Value of any type that is going to be stored
 * @returns {Promise} The Promise that `saga` can later process/call easily
 */
export const setLocalDbData = (key, value) =>
  localForage
    .setItem(key, value)
    .then(result => result)
    .catch(reason => reason);
