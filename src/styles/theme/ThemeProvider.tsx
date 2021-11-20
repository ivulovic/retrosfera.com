import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { useThemeSlice } from './slice';
import { selectTheme, selectThemeKey } from './slice/selectors';
import { isSystemDark } from './utils';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();

  const theme = useSelector(selectTheme);
  const themeKey = useSelector(selectThemeKey);
  const preferedTheme = themeKey === 'system' ? isSystemDark ? 'dark' : 'light' : themeKey;
  return (
    <div className={preferedTheme}>
      <OriginalThemeProvider theme={theme}>
        {React.Children.only(props.children)}
      </OriginalThemeProvider>
    </div>
  );
};
