import { createStore } from 'redux';
import { appStateReducer } from '.';

export const store = createStore(appStateReducer, /* preloadedState, */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof window !== 'undefined' ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() : null
);
