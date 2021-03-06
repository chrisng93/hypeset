/**
 * Configure store
 */

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});
const router = routerMiddleware(browserHistory);

const middleware = process.env.NODE_ENV === 'production' ? applyMiddleware(thunk, router) : applyMiddleware(thunk, router, logger);
const createStoreWithMiddleware = compose(middleware, autoRehydrate())(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
