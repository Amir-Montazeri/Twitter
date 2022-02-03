import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { tweets } from './tweets';
import { screen } from './screen';
import { client } from './client';

const reducers = {
  tweets,
  screen,
  client
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(
  rootReducer,
  applyMiddleware(thunk)
);