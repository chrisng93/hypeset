/**
 * Created by chrisng on 3/14/17.
 */
import { fromJS, List, Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  allBrands: new List(),
  userBrands: new List(),
  error: {
    status: '',
    message: '',
  },
});

export default function brand(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_BRANDS_SUCCESS:
      return state.set('allBrands', payload.brands)
        .set('error', new Map());
    case actionTypes.GET_ALL_BRANDS_FAILURE:
      return state.set('allBrands', new List())
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.GET_USER_BRANDS_SUCCESS:
      return state.set('userBrands', payload.brands);
    case actionTypes.GET_USER_BRANDS_FAILURE:
      return state.set('userBrands', new List())
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    default:
      return state;
  }
}
