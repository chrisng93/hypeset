/**
 * Created by chrisng on 3/19/17.
 */
import { fromJS, List, Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  sales: new List(),
  error: new Map(),
});

export default function sales(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_SALES_SUCCESS:
      return state.set('sales', state.get('sales').concat(new List(payload.sales)))
        .set('error', new Map());
    case actionTypes.GET_SALES_FAILURE:
      return state.setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    default:
      return state;
  }
}
