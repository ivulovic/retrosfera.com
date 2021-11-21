/**
 *
 * Notification Provider WebSocket Errors
 *
 */
import message from '../messages/wsMessages';
import commonMessages from '../messages/commonMessages';

const resolveWsError = (msg, code) => {
  switch (code) {
    case 100: // WS_NOT_SUPPORTED
      return { ...message.wsNotSupported };
    case 101: // WS_CONNECTION_NOT_ESTABLISHED
      return { ...message.connectionNotEstablished };
    default:
      return msg || { ...commonMessages.errorOccurred };
  }
};

export default resolveWsError;
