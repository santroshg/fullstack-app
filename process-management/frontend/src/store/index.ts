import { createStore, combineReducers, Reducer } from 'redux';
import TrelloApplicationReducer from './trello/reducer';
import SlackApplicationReducer from './slack/reducer';
import { TrelloApplicationState } from './trello/types';
import { SlackApplicationState } from './slack/types';

const reducers = combineReducers({
    trelloReducer: (TrelloApplicationReducer as Reducer<TrelloApplicationState>),
    slackReducer: (SlackApplicationReducer as Reducer<SlackApplicationState>)
});
const store = createStore(reducers);

// const store = createStore((TrelloApplicationReducer as Reducer<TrelloApplicationState>));
// const store = createStore((SlackApplicationReducer as Reducer<SlackApplicationState>));

export default store;