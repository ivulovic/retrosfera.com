/**
 *
 * Notification Provider API Errors
 *
 */
import { customErrorCodes } from 'utils/enums';

import apiMessages from '../messages/apiMessages';
import commonMessages from '../messages/commonMessages';

const resolveApiError = (msg, code) => {
  switch (code) {
    case customErrorCodes.LIMIT_ALL_SETTINGS_FETCH_FAIL:
      switch (msg) {
        case 'LIMIT_ALL_SETTINGS_FETCH_FAIL':
          return { ...apiMessages.limitAllSettingsFetchFailed };
        default:
          // Go to parents default
          break;
      }
      break;

    case customErrorCodes.LIMIT_SETTINGS_FOR_USER_FETCH_FAIL:
      switch (msg) {
        case 'LIMIT_SETTINGS_FOR_USER_FETCH_FAIL':
          return { ...apiMessages.userLimitsFetchFailed };
        default:
          // Go to parents default
          break;
      }
      break;

    case 80000:
      switch (msg) {
        case 'INTERNAL_SERVER_ERROR':
          return { ...apiMessages.internalServerError };
        default:
          // Go to parents default
          break;
      }
      break;

    case 80001:
      switch (msg) {
        case 'INTERNAL_SERVER_TIMEOUT':
          return { ...apiMessages.internalServerTimeout };
        default:
          // Go to parents default
          break;
      }
      break;

    // register
    case 90001:
      switch (msg) {
        case 'USER_ALREADY_EXISTS':
          return { ...apiMessages.userExists };
        default:
          // Go to parents default
          break;
      }
      break;

    case 90003:
      return { ...apiMessages.currencyBlockedOrNonexistent };

    case 90005:
      switch (msg) {
        case 'PAYMENT_NOT_FOUND':
          return { ...apiMessages.paymentNotFound };
        default:
          break;
      }
      break;

    case 90008:
      switch (msg) {
        case 'INSUFFICIENT_FUNDS':
          return { ...apiMessages.insufficentFunds };
        default:
          break;
      }
      break;

    case 90009:
      switch (msg) {
        case 'WITHDRAW_NOT_ALLOWED':
          return { ...apiMessages.withdrawalNotAllowed };
        default:
          break;
      }
      break;

    case 90010:
      switch (msg) {
        case 'WITHDRAW_FAILED':
          return { ...apiMessages.withdrawFailed };
        default:
          break;
      }
      break;

    case 90012:
      switch (msg) {
        case 'UNEXPECTED_PAYMENT_STATUS':
          return { ...apiMessages.paymentAlreadyChanged };
        default:
          break;
      }
      break;

    case 90020:
      return { ...apiMessages.orderStatusAlreadyChanged };

    case 90023:
      switch (msg) {
        case 'USER_UPDATE_NOT_ALLOWED':
          return { ...apiMessages.userNotAllowed };
        default:
          break;
      }
      break;

    case 90034:
      switch (msg) {
        case 'TRADING_NOT_ALLOWED':
          return { ...apiMessages.tradingNotAllowed };
        default:
          break;
      }
      break;

    case 90035:
      switch (msg) {
        case 'WITHDRAW_REQUEST_NOT_VALID':
          return { ...apiMessages.withdrawRequestNotValid };
        default:
          break;
      }
      break;

    case 90038:
      switch (msg) {
        case 'FROZEN_ORDERBOOK':
          return { ...apiMessages.frozenOrderbook };
        default:
          break;
      }
      break;

    case 90040:
      return { ...apiMessages.withdrawalForCurrencyNotAllowed };

    case 90043:
      switch (msg) {
        case 'WITHDRAW_CRYPTO_CURRENCY':
          return { ...apiMessages.withdrawFailed };
        default:
          break;
      }
      break;

    case 90044:
      switch (msg) {
        case 'PAYMENT_MIN_AMOUNT_CHECK_FAILED':
          return { ...apiMessages.paymentMinAmountCheckFailed };
        default:
          break;
      }
      break;

    case 90045:
      switch (msg) {
        case 'FEES_DONT_MATCH':
          return { ...apiMessages.feesDontMatch };
        default:
          break;
      }
      break;

    case 90048:
      switch (msg) {
        case 'SANITY_CHECK':
          return { ...apiMessages.sanityCheck };
        default:
          break;
      }
      break;

    case 90049:
      switch (msg) {
        case 'PAYMENT_NOT_MATCHING_CONFIRMATIONTOKEN':
          return { ...apiMessages.paymentNotMatchingConfirmationToken };
        default:
          break;
      }
      break;

    case 90050:
      switch (msg) {
        case 'MIN_ORDER_TOTAL_SIZE_CHECK_FAILED':
          return { ...apiMessages.minOrderTotalSizeCheckFailed };
        default:
          break;
      }
      break;

    case 90057:
      switch (msg) {
        case 'USER_LIMIT_EXCEEDED':
          return { ...apiMessages.userLimitExceeded };
        default:
          break;
      }
      break;

    case 90063:
      switch (msg) {
        case 'MAX_ORDER_TOTAL_SIZE_CHECK_FAILED':
          return { ...apiMessages.maxOrderTotalSizeCheckFailed };
        default:
          break;
      }
      break;

    case 50020: {
      switch (msg) {
        case 'RECAPTCHA_IS_NOT_VALID':
          return { ...apiMessages.recaptchaError };
        default:
          break;
      }
      break;
    }

    case 50000: {
      switch (msg) {
        case 'WRONG_CURRENT_PASSWORD':
          return { ...apiMessages.wrongCurrentPassword };

        case 'WRONG_DEACTIVATE_PASSWORD':
          return { ...apiMessages.wrongCurrentPassword };
        default:
          break;
      }
      break;
    }

    // security
    case 50025:
      return { ...apiMessages.invalidSecurityToken };

    // freeze user
    case 50027:
      return { ...apiMessages.invalidFreezeAccountToken };

    // reset password
    case 40002:
      return { ...apiMessages.invalidToken };

    // twofa
    case 40003:
      return { ...apiMessages.alreadyConfigured };

    case 40004: {
      switch (msg) {
        case 'INVALID_TWOFA': {
          return { ...apiMessages.pinNotValid };
        }

        default:
          break;
      }
      const message = {
        ...apiMessages.wrongWithdrawalTwoFA,
        values: { time: new Date() },
      }; // TODO: format date
      return { ...message };
    }

    case 50007:
      return { ...apiMessages.pinNotValid };

    default:
      break;
  }
  return msg || { ...commonMessages.errorOccurred };
};

export default resolveApiError;
