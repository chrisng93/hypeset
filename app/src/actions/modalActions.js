/**
 * Created by chrisng on 3/25/17.
 */
import * as actionTypes from '../constants/actionTypes.js';

export function exitAllModals() {
  return {
    type: actionTypes.EXIT_ALL_MODALS,
  }
}

export function routeToSignInModal() {
  return (dispatch) => {
    dispatch(exitAllModals());
    dispatch({ type: actionTypes.ROUTE_TO_SIGN_IN_MODAL });
  }
}

export function exitSignInModal() {
  return (dispatch) => dispatch({ type: actionTypes.EXIT_SIGN_IN_MODAL });
}

export function routeToSignUpModal() {
  return (dispatch) => {
    dispatch(exitAllModals());
    dispatch({ type: actionTypes.ROUTE_TO_SIGN_UP_MODAL });
  }
}

export function exitSignUpModal() {
  return (dispatch) => dispatch({ type: actionTypes.EXIT_SIGN_UP_MODAL });
}

export function routeToSignedOutModal() {
  return (dispatch) => {
    dispatch(exitAllModals());
    dispatch({ type: actionTypes.ROUTE_TO_SIGNED_OUT_MODAL });
  }
}

export function exitSignedOutModal() {
  return (dispatch) => dispatch({ type: actionTypes.EXIT_SIGNED_OUT_MODAL });
}
