import React from 'react';
import { ColorSchemeProvider } from '@chayns-components/core';
import { Provider } from 'react-redux';
import { ChaynsProvider } from 'chayns-api';
import App from './App';
import { store } from '../redux-modules/store';

const AppWrapper = () => {
    return (
        <ChaynsProvider>
            <ColorSchemeProvider>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ColorSchemeProvider>
        </ChaynsProvider>
    )
}

export default AppWrapper;
