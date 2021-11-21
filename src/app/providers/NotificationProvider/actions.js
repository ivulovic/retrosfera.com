/*
 *
 * NotificationProvider actions
 *
 */

import {
  NOTIFICATION,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_WARNING,
  NOTIFICATION_ERROR,
} from './constants';

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
  (data, autoClose = defaultAutoClose) => ({
    type: NOTIFICATION,
    payload: buildNotificationPayload(data, notificationType, autoClose),
  });

/**
 * This functions are just helpers for notifiers
 * so they cannot make mistake
 */
export const infoNotification = highOrderNotificationTypeBuilder(
  NOTIFICATION_INFO,
  true,
);
export const successNotification = highOrderNotificationTypeBuilder(
  NOTIFICATION_SUCCESS,
  true,
);
export const warningNotification = highOrderNotificationTypeBuilder(
  NOTIFICATION_WARNING,
  false,
);
export const errorNotification = highOrderNotificationTypeBuilder(
  NOTIFICATION_ERROR,
  false,
);
