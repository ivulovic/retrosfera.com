/*
 *
 * NotificationProvider
 *
 * This component is used to handle notifications
 * in our system/application
 */

import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { defaultNotificationDuration } from 'settings';

export default function NotificationProvider() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={defaultNotificationDuration}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
      transition={Slide}
    />
  );
}
