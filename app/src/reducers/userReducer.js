/**
 * Created by chrisng on 3/12/17.
 */
import { fromJS,  Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  user: {},
  token: '',
  isAuthenticated: false,
  error: {},
});

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.AUTH_SUCCESS:
      return state.set('user', payload.user)
        .set('token', payload.token)
        .set('isAuthenticated', true)
        .set('error', new Map());
    case actionTypes.AUTH_FAILURE:
      return state.set('user', new Map())
        .set('token', '')
        .set('isAuthenticated', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.SIGNUP_SUCCESS:
      return state.set('user', payload.user)
        .set('token', payload.token)
        .set('isAuthenticated', true)
        .set('error', new Map());
    case actionTypes.SIGNUP_FAILURE:
      return state.set('isAuthenticated', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.EDIT_USER_SUCCESS:
      return state.set('user', payload.user)
        .set('error', new Map());
    case actionTypes.EDIT_USER_FAILURE:
      return state.setIn(['error', 'status'], false)
        .setIn(['error', 'message'], payload.message);

    default:
      return state;
  }
}
