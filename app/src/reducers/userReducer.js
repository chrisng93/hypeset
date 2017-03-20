/**
 * Created by chrisng on 3/12/17.
 */
import { fromJS,  Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  user: new Map(),
  token: '',
  isAuthenticated: false,
  isFetchingAuth: false,
  isFetchingSignup: false,
  isFetchingLogout: false,
  isFetchingEditUser: false,
  error: new Map(),
});

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.AUTH_FETCHING:
      return state.set('isFetchingAuth', true);
    case actionTypes.AUTH_SUCCESS:
      return state.set('user', new Map(payload.user))
        .set('token', payload.token)
        .set('isAuthenticated', true)
        .set('isFetchingAuth', false)
        .set('error', new Map());
    case actionTypes.AUTH_FAILURE:
      return state.set('user', new Map())
        .set('token', '')
        .set('isAuthenticated', false)
        .set('isFetchingAuth', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.SIGNUP_FETCHING:
      return state.set('isFetchingSignup', true);
    case actionTypes.SIGNUP_SUCCESS:
      return state.set('user', new Map(payload.user))
        .set('token', payload.token)
        .set('isAuthenticated', true)
        .set('isFetchingSignup', false)
        .set('error', new Map());
    case actionTypes.SIGNUP_FAILURE:
      return state.set('isAuthenticated', false)
        .set('isFetchingSignup', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.LOGOUT_FETCHING:
      return state.set('FetchingLogout', true);
    case actionTypes.LOGOUT_SUCCESS:
      return state.set('user', new Map())
        .set('token', '')
        .set('isAuthenticated', false)
        .set('isFetchingLogout', false)
        .set('error', new Map());
    case actionTypes.LOGOUT_FAILURE:
      return state.set('user', new Map())
        .set('token', '')
        .set('isAuthenticated', false)
        .set('isFetchingLogout', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.EDIT_USER_FETCHING:
      return state.set('isFetchingEditUser', true);
    case actionTypes.EDIT_USER_SUCCESS:
      return state.set('user', new Map(payload.user))
        .set('isFetchingEditUser', false)
        .set('error', new Map());
    case actionTypes.EDIT_USER_FAILURE:
      return state.set('isFetchingEditUser', false)
        .setIn(['error', 'status'], false)
        .setIn(['error', 'message'], payload.message);

    default:
      return state;
  }
}
