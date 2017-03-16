import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import brand from './brandReducer';
import news from './newsReducer';

export default combineReducers({
  user,
  brand,
  news,
  routing: routerReducer,
});
