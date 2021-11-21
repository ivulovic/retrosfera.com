import { notificationDuration } from 'utils/enums';
import toast from './styledToast';
import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_INFO,
  NOTIFICATION_WARNING,
  NOTIFICATION_ERROR,
} from './constants';

import resolveApiError from './errors/apiErrors';
import resolveWsError from './errors/wsErrors';
import {
  infoNotificationBody,
  successNotificationBody,
  warningNotificationBody,
  errorNotificationBody,
  defaultNotificationBody,
} from './notificationBody';

import commonMessages from './messages/commonMessages';

/**
 * This variable will store references to timers
 * if key exists, that mean that time is not finished
 */
const memorizedNotificationMessage = {};

/**
 * This is config parameter
 * It's value in `ms`
 * It represents how many milliseconds displayed message cannot be displayed again
 */
export const blockOutNotificationDisplay = 100;

/**
 * This function is responsible to resolve notification
 * it will handle error message rate, so the same message cannot be displayed in short interval
 *
 * @param {object} payload  Data that is send to notification to display
 */
function notificationHandler(payload) {
  let notification = null;
  let notificationBody = null;
  const { data, type, autoClose } = payload; // TODO: add duration as optional setting - maybe if we need it later

  switch (type) {
    case NOTIFICATION_INFO:
      notification = toast.info;
      notificationBody = infoNotificationBody;
      break;
    case NOTIFICATION_SUCCESS:
      notification = toast.success;
      notificationBody = successNotificationBody;
      break;
    case NOTIFICATION_WARNING:
      notification = toast.warn;
      notificationBody = warningNotificationBody;
      break;
    case NOTIFICATION_ERROR:
      notification = toast.error;
      notificationBody = errorNotificationBody;
      break;
    default:
      notification = toast.basic;
      notificationBody = defaultNotificationBody;
      break;
  }

  /**
   * This is memorize logic, it will check if message has been shown to user
   * if it is, it will clear timer that `disables` new same messages to be displayed
   * else, it will show notification
   */
  const memoKey =
    typeof data.message === 'string' ? data.message : data.message.id;
  if (memorizedNotificationMessage[memoKey])
    clearTimeout(memorizedNotificationMessage[memoKey]);
  else notification(notificationBody(data.message, data.code), { autoClose });
  memorizedNotificationMessage[memoKey] = setTimeout(() => {
    delete memorizedNotificationMessage[memoKey];
  }, blockOutNotificationDisplay);
}

/**
 * This method is helper for creating `payload` for notification
 *
 * @param {object} data       Data that is going to be shown,
 *                            this is object and it should be made with one of `Build Message For *` functions
 * @param {string} type       Which type of notification should popup
 * @param {boolean} autoClose Should notification close after some time
 */
const buildNotificationPayload = (data, type, autoClose = true) => ({
  data,
  type,
  autoClose,
});

/**
 * This is HIGH ORDER function
 * it will create needed function for chosen `Notification Type`
 *
 * @param {string} notificationType   This is notification type that is going to be passed as `build notification payload` second argument
 * @param {boolean} defaultAutoClose  Should notification auto close after popup as default
 */
const highOrderNotificationTypeBuilder =
  (notificationType, defaultAutoClose) =>
  (data, autoClose = defaultAutoClose) => {
    const payload = buildNotificationPayload(data, notificationType, autoClose);
    notificationHandler(payload);
  };

/**
 * This functions are just helpers for notifiers
 * so they cannot make mistake
 */
/**
 * Info notification is used to notify user about something that happened
 *
 * @param {object} data       This is complex object that is needed to build message that is
 *                            later displayed to use. Use proper build function to add data as argument
 * @param {boolean} autoClose Should notification auto close, default: `true`
 */
export const infoNotification = highOrderNotificationTypeBuilder(
  NOTIFICATION_INFO,
  true,
);
/**
 * Success notification is used to notify user about something that successfully happened
 *
 * @param {object} data     This is complex object that is needed to build message that is
 *                          later displayed to use. Use proper build function to add data as argument
 * @param {boolean} autoClose Should notification auto close, default: `true`
 */
export const successNotification = highOrderNotificationTypeBuilder(
  NOTIFICATION_SUCCESS,
  true,
);
/**
 * Warning notification is used to notify user about something that they should be aware about
 *
 * @param {object} data     This is complex object that is needed to build message that is
 *                          later displayed to use. Use proper build function to add data as argument
 * @param {boolean} autoClose Should notification auto close, default: `false`
 */
export const warningNotification = highOrderNotificationTypeBuilder(
  NOTIFICATION_WARNING,
  true,
);
/**
 * Error notification is used to notify user about error that happened
 *
 * @param {object} data     This is complex object that is needed to build message that is
 *                          later displayed to use. Use proper build function to add data as argument
 * @param {boolean} autoClose Should notification auto close, default: `false`
 */
export const errorNotification = highOrderNotificationTypeBuilder(
  NOTIFICATION_ERROR,
  notificationDuration.error,
);

/**
 * This is function that is only the pattern for creation of message data
 * @param {string|object} message  Message text that is going to be displayed for user OR object that is later going to be translated
 * @param {number} code     This is error code that is going to be displayed to user for developers
 * @param {Date} timestamp  This is time when something happened, it can be some time before it is printed, so we need to get it from source
 */
const buildMessage = (message, code, timestamp) => ({
  message,
  //
  code,
  timestamp,
});

/**
 * This is to build different type of notifications and to return nice object with convention
 */
export const buildPromiseMessageFromApi = (
  response,
  notificationType,
  ...args
) =>
  buildMessageFromAPI(response).then((message, ...rest) =>
    notificationType(message, ...args, ...rest),
  );

/**
 * @docs FrontEnd // Providers // Notification Provider
 * @desc buildMessageFromAPI - Function that is going to `extract` information from response to resolve error message and return `build message` object
 *
 * @param {object} event - input event object from websocket
 * @param {Date} timestamp - this is time when API error happened or when this function is called
 * @returns {object} build message - convention for build message
 */
export const buildMessageFromAPI = (response, timestamp = new Date()) =>
  new Promise(resolve => {
    // eslint-disable-line
    if (!response) {
      // API down
      const message = commonMessages.errorAPIDown;
      return resolve(buildMessage(message, null, timestamp));
    }
    //
    //
    const defaultMessage = commonMessages.someErrorOccurred;
    if (typeof response.json !== 'function') {
      const { message: msg, code } = response;
      const message = resolveApiError(msg, code);
      return resolve(buildMessage(message, code, timestamp));
    }

    return response
      .json()
      .then(errorObj => {
        if (errorObj === null || typeof errorObj !== 'object') {
          throw Error('empty');
        }
        // two scenarions:
        // 1. there is an error object
        // 2. message and code are directly in the resposne body
        const error = errorObj.error ? errorObj.error : errorObj;
        const { message: msg, code } = error;
        const message = resolveApiError(msg, code);

        return resolve(buildMessage(message, code, timestamp));
      })
      .catch(() => resolve(buildMessage(defaultMessage, null, timestamp)));
  });

/**
 * @docs FrontEnd // Providers // Notification Provider
 * @desc buildMessageFromWebSocket - Function that is going to `extract` information from event to resolve error message and return `build message` object
 *
 * @param {object} event - input event object from websocket
 * @param {Date} timestamp - this is time when WS error happened or when this function is called
 * @returns {object} build message - convention for build message
 */
export const buildMessageFromWebSocket = (event, timestamp = new Date()) => {
  //
  // idea is to call `websocket error handler` and to pass it
  // some type of extracted data
  //
  // error handling function should return us needed data to `build message`
  //
  console.log('resolveWsError');
  const message = resolveWsError(event.message, event.code);
  return buildMessage(message, event.code, timestamp);
};

/**
 * @docs FrontEnd // Providers // Notification Provider
 * @desc buildMessageFromDev - This is function that is creating popup message that not need any type of process
 *
 * @param {string||object} message - input message that is going to be displayed to user
 * @param {Date} timestamp - this is time when some error happened or when this function is called
 * @returns {object} build message - convention for build message
 */
export const buildMessageFromDev = (
  message,
  code = null,
  timestamp = new Date(),
) => buildMessage(message, code, timestamp);
