import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import brand from './brandReducer';

export default combineReducers({
  user,
  brand,
  routing: routerReducer,
});
