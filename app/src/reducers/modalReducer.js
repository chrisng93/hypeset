/**
 * Created by chrisng on 3/25/17.
 */
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  signInModal: false,
  signUpModal: false,
  signedOutModal: false,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ROUTE_TO_SIGN_IN_MODAL:
      return { ...state, signInModal: true };
    case actionTypes.EXIT_SIGN_IN_MODAL:
      return { ...state, signInModal: false };

    case actionTypes.ROUTE_TO_SIGN_UP_MODAL:
      return { ...state, signUpModal: true };
    case actionTypes.EXIT_SIGN_UP_MODAL:
      return { ...state, signUpModal: false };

    case actionTypes.ROUTE_TO_SIGNED_OUT_MODAL:
      return { ...state, signedOutModal: true };
    case actionTypes.EXIT_SIGNED_OUT_MODAL:
      return { ...state, signedOutModal: false };

    case actionTypes.EXIT_ALL_MODALS:
      return initialState;

    default:
      return state;
  }
}
