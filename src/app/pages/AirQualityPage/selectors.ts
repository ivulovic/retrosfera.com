import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { AIR_QUALITY_SCOPE } from './constants';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state[AIR_QUALITY_SCOPE] || initialState;

export const selectLoading = createSelector([selectDomain], s => s.loading);

export const selectError = createSelector([selectDomain], s => s.error);

export const selectData = createSelector([selectDomain], state => state.data);
