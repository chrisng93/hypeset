import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import brand from './brandReducer';
import news from './newsReducer';
import sales from './salesReducer';

export default combineReducers({
  user,
  brand,
  news,
  sales,
  routing: routerReducer,
});
