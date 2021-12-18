import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { AIR_QUALITY_SCOPE } from './constants';
import { AirQualityState } from './types';

export const initialState: AirQualityState = {
  data: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: AIR_QUALITY_SCOPE,
  initialState,
  reducers: {
    loadAirQualityInfo(state) {
      state.loading = true;
    },
    loadedAirQualityInfo(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
    loadAirQualityInfoError(state) {
      state.loading = false;
    },
    clearAirQualityState(state) {
      return initialState;
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
