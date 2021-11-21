import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState, THEME_SCOPE } from './constants';

export const selectThemeKey = createSelector(
  [(state: RootState) => state[THEME_SCOPE] || initialState],
  theme => theme.selected,
);
