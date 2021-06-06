import { createStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools());