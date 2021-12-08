/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-toastify/dist/ReactToastify.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import FontFaceObserver from 'fontfaceobserver';

import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import { ThemeProvider } from 'styles/theme/ThemeProvider';
import './styles/style.scss';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';
import AuthProvider from 'app/providers/AuthProvider';
import NotificationProvider from 'app/providers/NotificationProvider';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
// const fontObserver = new FontFaceObserver('Play', {});

// When Inter is loaded, add a font-family using Inter to the body
// fontObserver.load().then(() => {
//   document.body.classList.add('fontLoaded');
// });

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <HelmetProvider>
        <AuthProvider />
        <NotificationProvider />
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HelmetProvider>
    </ThemeProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
