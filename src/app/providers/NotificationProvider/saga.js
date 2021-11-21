import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonMessages from 'app/providers/NotificationProvider/messages/commonMessages';
import {
  buildMessageFromDev,
  errorNotification,
  buildPromiseMessageFromApi,
} from 'utils/notifications';
import {
  NOTIFICATION,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_INFO,
  NOTIFICATION_WARNING,
  NOTIFICATION_ERROR,
} from './constants';
// import { maintenanceModeLoaded } from '../MaintenanceProvider/actions';
import { logoutUser } from 'app/providers/AuthProvider/actions';

export function* handleMaintenanceModeSetup() {
  errorNotification(buildMessageFromDev(commonMessages.errorAPIDown));
  // yield put(maintenanceModeLoaded(true));
}

/* @docs FrontEnd // Providers // Notification Provider
 * @desc handleApiError - Manage user state from sagas
 *
 * @param {object} error - Error catch-ed
 * @param {Function} notificationType - Type of notification that is going to be printed
 */
export function* handleApiError(error, notificationType, defMessage, ...args) {
  console.log({ error });
  const { response } = error;
  if (response) {
    const { status } = response;
    switch (status) {
      case 401:
        errorNotification(
          buildMessageFromDev(commonMessages.userSessionExpired),
        );
        yield put(logoutUser(false));
        return;
      case 503:
        yield handleMaintenanceModeSetup();
        return;
      default:
        // Do nothing
        // function below is going to finish the job
        break;
    }
  } else if (!response && error && error.message === 'Failed to fetch') {
    yield handleMaintenanceModeSetup();
    return;
  }

  yield buildPromiseMessageFromApi(
    response,
    notificationType,
    defMessage,
    ...args,
  );
}

export function* notificationHandler(action) {
  let notification = null;
  const { data, type, autoClose } = action.payload;

  switch (type) {
    case NOTIFICATION_INFO:
      notification = toast.info;
      break;
    case NOTIFICATION_SUCCESS:
      notification = toast.success;
      break;
    case NOTIFICATION_WARNING:
      notification = toast.warn;
      break;
    case NOTIFICATION_ERROR:
      notification = toast.error;
      break;
    default:
      notification = toast;
      break;
  }

  yield call(notification, data, { autoClose });
}

// This is root listener for event
export default function* notificationListener() {
  yield takeEvery(NOTIFICATION, notificationHandler);
}
