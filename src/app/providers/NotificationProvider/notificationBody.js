/**
 *
 * Notification Provider Body
 *
 *
 * Place where body of toast's are created
 * Here we `translate` messages if that is needed
 */
import React from 'react';

const Icon = () => <span />;

const notificationIcons = {
  alert:
    'M512 47.262c-259.938 0-472.615 212.677-472.615 472.615s212.677 472.615 472.615 472.615c259.938 0 472.615-212.677 472.615-472.615s-212.677-472.615-472.615-472.615zM571.077 815.262h-118.154v-118.154h118.154v118.154zM571.077 618.338h-118.154v-393.846h118.154v393.846z',
  checkmark:
    'M492.308 27.569c-259.938 0-472.615 212.677-472.615 472.615s212.677 472.615 472.615 472.615 472.615-212.677 472.615-472.615c0-259.938-212.677-472.615-472.615-472.615zM578.954 598.646c-98.462 118.154-126.031 177.231-126.031 177.231s-59.077-78.769-122.092-129.969-118.154-78.769-118.154-78.769l157.538-94.523 78.769 145.723c0 0 35.446-110.277 122.092-228.431 90.585-118.154 185.108-165.415 185.108-165.415s-3.938 78.769 0 126.031c3.938 43.323 11.815 86.646 11.815 86.646s-90.585 43.323-189.046 161.477z',
  info: 'M512 47.262c-259.938 0-472.615 212.677-472.615 472.615s212.677 472.615 472.615 472.615c259.938 0 472.615-212.677 472.615-472.615s-212.677-472.615-472.615-472.615zM571.077 815.262h-118.154v-393.846h118.154v393.846zM571.077 342.646h-118.154v-118.154h118.154v118.154z',
};

const notificationBodyHOC =
  (icon = null) =>
  message =>
    (
      <div>
        {icon && <Icon icon={icon} />}
        {typeof message === 'string' ? message : ''}
      </div>
    );

export const defaultNotificationBody = notificationBodyHOC();
//
export const infoNotificationBody = notificationBodyHOC(notificationIcons.info);
export const successNotificationBody = notificationBodyHOC(
  notificationIcons.checkmark,
);
export const warningNotificationBody = notificationBodyHOC(
  notificationIcons.info,
);
//
export const errorNotificationBody = (
  message,
  code,
  icon = notificationIcons.alert,
) => (
  <div className="notification-body">
    {icon && <Icon icon={icon} />}
    {typeof message === 'string' ? message : ''}
    {code && <span className="notification-error-code">[{code}]</span>}
  </div>
);
