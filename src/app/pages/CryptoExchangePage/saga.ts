import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { request, makeGetReq } from 'utils/request';
import { actions } from './slice';

export function* getAvailableSymbols(action) {
  const requestURL = `/bitfinex/conf/pub:list:pair:exchange`;

  try {
    const response: Array<Array<string>> = yield call(
      request,
      requestURL,
      makeGetReq() as RequestInit,
    );
    yield put(actions.loadedAvailableSymbols(response[0]));
  } catch (err) {
    yield put(actions.loadAvailableSymbolsFail());
  }
}

export function* cryptoexchangeSaga() {
  yield takeLatest(actions.loadAvailableSymbols.type, getAvailableSymbols);
}
