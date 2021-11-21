import { defaultNotificationDuration } from 'settings';

export const UserState = {
  REGISTERED: 1,
  EMAIL_VERIFIED: 2,
  PENDING_VERIFICATION: 3,
  VERIFIED: 4,
  VIP: 5,
};

export const userStateName = {
  REGISTERED: 'REGISTERED',
  EMAIL_VERIFIED: 'EMAIL_VERIFIED',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  VERIFIED: 'VERIFIED',
  VIP: 'VIP',
};
//

export const limitLevels = {
  level1: 'Level1',
  level2: 'Level2',
  level3: 'Level3',
};
//

export const paymentType = {
  FIAT: 'fiat',
  CRYPTO: 'crypto',
};
export const paymentMethod = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  WITHDRAW: 'withdraw',
};
//

// used in deposit/withdrawal tables
export const inputPaymentStatuses = {
  NEW: 'New',
  SETTLED: 'SETTLED',
  AUDIT_REQUIRED: 'AUDIT_REQUIRED',
  AUDIT_IN_PROGRESS: 'AUDIT_IN_PROGRESS',
  RECEIVED: 'RECEIVED', //
  USER_CONFIRMATION_REQUIRED: 'USER_CONFIRMATION_REQUIRED',
  CANCELED: 'CANCELED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
};

export const outputPaymentStatuses = {
  NEW: 'New',
  SETTLED: 'Finished',
  AUDIT_REQUIRED: 'Waiting to be processed',
  AUDIT_IN_PROGRESS: 'In process',
  USER_CONFIRMATION_REQUIRED: 'E-Mail Confirmation needed',
  CANCELED: 'Canceled',
  REJECTED: 'Rejected',
  PENDING: 'In process',
  COMPLETED: 'Completed',
  ERROR: 'Failed',
};

// currencies
export const currencies = {
  EUR: 'EUR',
  USD: 'USD',
  //
  BTC: 'BTC',
  BCH: 'BCH',
  ETH: 'ETH',
};

export const currencyFullNames = {
  BTC: 'Bitcoin',
  BCH: 'Bitcoin Cash',
  ETH: 'Ethereum',
  BSV: 'Bitcoin SV',
};

export const currencyTypes = {
  CRYPTO: 'C',
  FIAT: 'F',
};

// payment fee
export const paymentFeeTypes = {
  BTC: 'BTC',
  BCH: 'BCH',
  ETH: 'ETH',
  SEPA: 'Sepa',
  WIRE: 'Wire',
};

// trading fee
export const tradingFeeTypes = {
  TAKER: 'taker',
  MAKER: 'maker',
};

// order statuses

export const OrderStatus = {
  FILLED: 'FILLED',
  PARTIALLY_FILLED: 'PARTIALLY_FILLED',
  //
  CANCELED: 'CANCELED',
  PARTIALLY_CANCELED: 'PARTIALLY_CANCELED',
  //
  WAIT_FOR_CONFIRMATION: 'WAIT_FOR_CONFIRMATION',
};

// export type
export const exportTypes = {
  CSV: 'csv',
  EXCEL: 'excel',
};

export const OrderBook = {
  BID: 'bid',
  ASK: 'ask',
};

// notification time
export const notificationDuration = {
  error: defaultNotificationDuration,
  //
  info: defaultNotificationDuration,
  success: defaultNotificationDuration,
  warning: defaultNotificationDuration,
};

// task params from url
export const taskParameter = {
  setPassword: 'setPassword',
  activateUser: 'activateUser',
  //
  freezeAccount: 'freezeAccount',
};

// custom errors
export const customErrors = {
  INVALID_TWOFA: 'INVALID_TWOFA',
  WRONG_CURRENT_PASSWORD: 'WRONG_CURRENT_PASSWORD',
  LIMIT_ALL_SETTINGS_FETCH_FAIL: 'LIMIT_ALL_SETTINGS_FETCH_FAIL',
  LIMIT_SETTINGS_FOR_USER_FETCH_FAIL: 'LIMIT_SETTINGS_FOR_USER_FETCH_FAIL',
};

// date types
export const dateFormats = {
  UTC: 'UTC',
  LOCAL: 'local',
};

export const customErrorCodes = {
  LIMIT_ALL_SETTINGS_FETCH_FAIL: 1,
  LIMIT_SETTINGS_FOR_USER_FETCH_FAIL: 2,
  GRID_LAYOUT_INITIALISATION: 3,
  GRID_LAYOUT_SAVE: 4,
};
