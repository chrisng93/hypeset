import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import brand from './brandReducer';
import news from './newsReducer';
import sales from './salesReducer';
import modal from './modalReducer';

export default combineReducers({
  user,
  brand,
  news,
  sales,
  modal,
  routing: routerReducer,
});
