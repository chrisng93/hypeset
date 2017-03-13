/**
 * Created by chrisng on 3/12/17.
 */
import { fromJS,  Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  user: {
    role: '',
    id: '',
    username: '',
    email: '',
    updatedAt: '',
    createdAt: '',
    firstName: '',
    lastName: '',
  },
  token: '',
  error: {
    status: false,
    message: '',
  },
});

export default function auth(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return state.set('user', payload.user)
        .set('token', payload.token)
        .set('error', new Map());
    case actionTypes.AUTH_FAILURE:
      return state.set('user', new Map())
        .set('token', '')
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);
    default:
      return state;
  }
}
