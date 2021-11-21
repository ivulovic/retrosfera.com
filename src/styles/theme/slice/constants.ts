import { getThemeFromStorage } from '../utils';
import { ThemeEnum, ThemeState } from './types';

export const THEME_SCOPE = 'theme';

export const initialState: ThemeState = {
  selected: getThemeFromStorage() || ThemeEnum.Light,
};
