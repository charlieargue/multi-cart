import { createStore } from 'redux';
import { appStateReducer } from '.';

export const store = createStore(appStateReducer);
