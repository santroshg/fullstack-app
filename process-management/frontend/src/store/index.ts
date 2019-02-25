import { createStore, Reducer, applyMiddleware } from 'redux';
import ProcessManagementReducer from './reducers';
import { ProcessManagementState } from './types';
import createSagaMiddleware from '@redux-saga/core';
import sagas from './sagas';

const initialState: ProcessManagementState = undefined;//require('./app.solution1.json');
const sagaMiddleware = createSagaMiddleware();
const store = createStore((ProcessManagementReducer as Reducer<ProcessManagementState>), initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
