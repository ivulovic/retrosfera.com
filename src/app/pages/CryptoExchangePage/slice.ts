import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { CRYPTOEXCHANGE_SCOPE } from './constants';
import { CryptoexchangeState } from './types';

export const initialState: CryptoexchangeState = {
  availableSymbols: [],
  lastUpdate: new Date().getTime(),
  loading: false,
  error: null,
};

const slice = createSlice({
  name: CRYPTOEXCHANGE_SCOPE,
  initialState,
  reducers: {
    loadAvailableSymbols(state) {
      state.loading = true;
    },
    loadedAvailableSymbols(state, action: PayloadAction<Array<string>>) {
      state.loading = false;
      state.availableSymbols = action.payload;
    },
    loadAvailableSymbolsFail(state) {
      state.loading = false;
    },
    configurationChanged(state) {
      state.lastUpdate = new Date().getTime();
    },
    clearCryptoexchangePageState(state) {
      return initialState;
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
