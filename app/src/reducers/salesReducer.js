/**
 * Created by chrisng on 3/19/17.
 */
import { fromJS, List, Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import { formatDates } from '../utils/dateUtils';

const initialState = fromJS({
  sales: new List(),
  isFetchingAllSales: false,
  isFetchingOwnSales: false,
  error: new Map(),
});

export default function sales(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_SALES_FETCHING:
      return state.set('isFetchingAllSales', true);
    case actionTypes.GET_ALL_SALES_SUCCESS:
      return state.set('sales', state.get('sales').concat(new List(formatDates(payload.sales))))
        .set('isFetchingAllSales', false)
        .set('error', new Map());
    case actionTypes.GET_ALL_SALES_FAILURE:
      return state.set('isFetchingAllSales', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.GET_OWN_SALES_FETCHING:
      return state.set('isFetchingOwnSales', true);
    case actionTypes.GET_OWN_SALES_SUCCESS:
      return state.set('sales', state.get('sales').concat(new List(formatDates(payload.sales))))
        .set('isFetchingOwnSales', false)
        .set('error', new Map());
    case actionTypes.GET_OWN_SALES_FAILURE:
      return state.set('isFetchingOwnSales', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.RESET_SALES:
      return state.set('sales', new List());

    default:
      return state;
  }
}
