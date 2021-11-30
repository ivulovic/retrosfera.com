import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { CRYPTOEXCHANGE_SCOPE } from './constants';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state[CRYPTOEXCHANGE_SCOPE] || initialState;

export const selectLoading = createSelector([selectDomain], s => s.loading);

export const selectError = createSelector([selectDomain], s => s.error);

export const selectLastUpdate = createSelector(
  [selectDomain],
  s => s.lastUpdate,
);

export const selectAvailableSymbols = createSelector(
  [selectDomain],
  state => state.availableSymbols,
);
