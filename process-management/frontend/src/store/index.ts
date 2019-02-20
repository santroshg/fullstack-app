import { createStore, Reducer } from 'redux';
import ProcessManagementReducer from './reducers';
import { ProcessManagementState } from './types';

const initialState: ProcessManagementState = require('./app.solution1.json');

const store = createStore((ProcessManagementReducer as Reducer<ProcessManagementState>), initialState);

export default store;
