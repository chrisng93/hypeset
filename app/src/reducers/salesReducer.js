/**
 * Created by chrisng on 3/19/17.
 */
import * as actionTypes from '../constants/actionTypes';
import { formatDates } from '../utils/dateUtils';

const freshErrorState = { status: false, message: '' };

const initialState = {
  sales: [],
  isFetchingAllSales: false,
  isFetchingOwnSales: false,
  error: freshErrorState,
};

export default function sales(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_SALES_FETCHING:
      return { ...state, isFetchingAllSales: true };
    case actionTypes.GET_ALL_SALES_SUCCESS:
      return {
        ...state,
        sales: state.sales.concat(formatDates(payload.sales)),
        isFetchingAllSales: false,
        error: freshErrorState,
      };
    case actionTypes.GET_ALL_SALES_FAILURE:
      return {
        ...state,
        isFetchingAllSales: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.GET_OWN_SALES_FETCHING:
      return { ...state, isFetchingOwnSales: true };
    case actionTypes.GET_OWN_SALES_SUCCESS:
      const sales = payload.replace ? formatDates(payload.sales) : state.sales.concat(formatDates(payload.sales));
      return {
        ...state,
        sales,
        isFetchingOwnSales: false,
        error: freshErrorState,
      };
    case actionTypes.GET_OWN_SALES_FAILURE:
      return {
        ...state,
        isFetchingOwnSales: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.RESET_SALES:
      return { ...state, sales: [] };

    default:
      return state;
  }
}
