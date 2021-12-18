import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { request, makeGetReq } from 'utils/request';
import { actions } from './slice';

export function* getAirQualityInfo(action) {
  const requestURL = `/data/sepa/airQuality.json`;
  try {
    const response = yield call(
      request,
      requestURL,
      makeGetReq() as RequestInit,
    );
    yield put(actions.loadedAirQualityInfo(response.data));
  } catch (err) {
    yield put(actions.loadAirQualityInfoError());
  }
}

export function* saga() {
  yield takeLatest(actions.loadAirQualityInfo.type, getAirQualityInfo);
}
