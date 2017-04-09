/**
 * Aggregate reducers
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import brand from './brandReducer';
import news from './newsReducer';
import sales from './salesReducer';
import persist from './persistReducer';

export default combineReducers({
  user,
  brand,
  news,
  sales,
  persist,
  routing: routerReducer,
});
