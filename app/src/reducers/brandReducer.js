/**
 * Created by chrisng on 3/14/17.
 */
import { fromJS, List, Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  allBrands: new List(),
  userBrands: new List(),
  brandsByPopularity: new List(),
  isFetchingAllBrands: false,
  isFetchingUserBrands: false,
  isFetchingBrandsByPopularity: false,
  isFetchingAddBrand: false,
  isFetchingRemoveBrand: false,
  error: new Map(),
});

export default function brand(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_BRANDS_FETCHING:
      return state.set('isFetchingAllBrands', true);
    case actionTypes.GET_ALL_BRANDS_SUCCESS:
      return state.set('allBrands', new List(payload.brands))
        .set('isFetchingAllBrands', false)
        .set('error', new Map());
    case actionTypes.GET_ALL_BRANDS_FAILURE:
      return state.set('isFetchingAllBrands', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.GET_USER_BRANDS_FETCHING:
      return state.set('isFetchingUserBrands', true);
    case actionTypes.GET_USER_BRANDS_SUCCESS:
      return state.set('userBrands', new List(payload.brands))
        .set('isFetchingUserBrands', false)
        .set('error', new Map());
    case actionTypes.GET_USER_BRANDS_FAILURE:
      return state.set('isFetchingUserBrands', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.GET_BRANDS_BY_POPULARITY_FETCHING:
      return state.set('isFetchingBrandsByPopularity', true);
    case actionTypes.GET_BRANDS_BY_POPULARITY_SUCCESS:
      return state.set('brandsByPopularity', new List(payload.brandsByPopularity))
        .set('isFetchingBrandsByPopularity', false)
        .set('error', new Map());
    case actionTypes.GET_BRANDS_BY_POPULARITY_FAILURE:
      return state.set('isFetchingBrandsByPopularity', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.ADD_BRAND_FETCHING:
      return state.set('isFetchingAddBrand', true);
    case actionTypes.ADD_BRAND_SUCCESS:
      return state.set('userBrands', state.get('userBrands').concat(new List([...payload.successfulInserts])))
        .set('isFetchingAddBrand', false)
        .set('error', new Map());
    case actionTypes.ADD_BRAND_FAILURE:
      return state.set('isFetchingAddBrand', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.REMOVE_BRAND_FETCHING:
      return state.set('isFetchingRemoveBrand', true);
    case actionTypes.REMOVE_BRAND_SUCCESS:
      return state.set('userBrands', state.get('userBrands').filter(brandModel => payload.successfulDeletes.indexOf(brandModel.name) < 0))
        .set('isFetchingRemoveBrand', false)
        .set('error', new Map());
    case actionTypes.REMOVE_BRAND_FAILURE:
      return state.set('isFetchingRemoveBrand', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    default:
      return state;
  }
}
