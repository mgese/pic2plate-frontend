import { configureStore } from '@reduxjs/toolkit';
import { recipeReducer } from './recipes/slice';
import { IS_DEVELOPMENT, IS_QA } from '../constants/environment';

export const store = configureStore({
    reducer: {
        recipes: recipeReducer
    },
    middleware: (getDefaultMiddleware) => {
        const defaultMiddleware = getDefaultMiddleware();

        if (IS_QA || IS_DEVELOPMENT) {
            /**
             * This inline require is removed for the staging and production
             * version by Terser during minification. Do not make it an import.
             */
            // eslint-disable-next-line
            const { createLogger } = require('redux-logger');

            // eslint-disable-next-line
            const logger = createLogger({ collapsed: true, duration: true });

            return defaultMiddleware.concat(logger);
        }

        return defaultMiddleware;
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetAppState = () => RootState;
