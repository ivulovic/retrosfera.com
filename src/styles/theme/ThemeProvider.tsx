import * as React from 'react';
import { useSelector } from 'react-redux';
import { useThemeSlice } from './slice';
import { selectThemeKey } from './slice/selectors';
import { isSystemDark } from './utils';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();
  const themeKey = useSelector(selectThemeKey);
  const preferedTheme: any =
    themeKey === 'system' ? (isSystemDark ? 'dark' : 'light') : themeKey;

  document.documentElement.setAttribute('theme', preferedTheme);
  return <>{React.Children.only(props.children)}</>;
};
