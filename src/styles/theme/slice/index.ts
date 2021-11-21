import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { THEME_SCOPE, initialState } from './constants';
import { ThemeEnum } from './types';

const slice = createSlice({
  name: THEME_SCOPE,
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeEnum>) {
      state.selected = action.payload;
    },
  },
});

export const { actions: themeActions, reducer } = slice;

export const useThemeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
