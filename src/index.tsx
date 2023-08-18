import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider as ReduxProvider } from 'react-redux';
// import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';

import { RootPage } from './pages';

(async () => {
    // const preloadedState = getPreloadedState();
    const root = createRoot(document.getElementById('root'));

    root.render(
        <AppContextProvider>
            <RootPage />
        </AppContextProvider>
    );
})();
