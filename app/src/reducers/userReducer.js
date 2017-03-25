/**
 * Created by chrisng on 3/12/17.
 */
import * as actionTypes from '../constants/actionTypes';

const freshErrorState = { status: false, message: '' };

const initialState = {
  user: {},
  token: '',
  isAuthenticated: false,
  isFetchingAuth: false,
  isFetchingSignup: false,
  isFetchingLogout: false,
  isFetchingEditUser: false,
  error: freshErrorState,
};

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.AUTH_FETCHING:
      return { ...state, isFetchingAuth: true };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
        isFetchingAuth: false,
        error: freshErrorState,
      };
    case actionTypes.AUTH_FAILURE:
      return {
        ...state,
        user: {},
        token: '',
        isAuthenticated: false,
        isFetchingAuth: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.SIGNUP_FETCHING:
      return { ...state, isFetchingSignup: true };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
        isFetchingSignup: false,
        error: freshErrorState,
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetchingSignup: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.LOGOUT_FETCHING:
      return { ...state, isFetchingLogout: true };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        token: '',
        isAuthenticated: false,
        isFetchingLogout: false,
        error: freshErrorState,
      };
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        user: {},
        token: '',
        isAuthenticated: false,
        isFetchingLogout: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.EDIT_USER_FETCHING:
      return { ...state, isFetchingEditUser: true };
    case actionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        isFetchingEditUser: false,
        error: freshErrorState,
      };
    case actionTypes.EDIT_USER_FAILURE:
      return {
        ...state,
        isFetchingEditUser: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.RESET_USER:
      return {
        ...state,
        user: {},
        token: '',
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
