import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './components/AppWrapper';

try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const root = createRoot(document.querySelector('#root'));
    root.render(<AppWrapper />);
} catch (e) {
    console.error('Encountered error at `ReactDOM.render`: ', e);
}
