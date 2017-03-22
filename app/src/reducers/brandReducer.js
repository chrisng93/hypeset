/**
 * Created by chrisng on 3/14/17.
 */
import * as actionTypes from '../constants/actionTypes';

const freshErrorState = { status: false, message: '' };

const initialState = {
  allBrands: [],
  userBrands: [],
  brandsByPopularity: [],
  brandInfos: {},
  isFetchingAllBrands: false,
  isFetchingUserBrands: false,
  isFetchingBrandsByPopularity: false,
  isFetchingAddBrand: false,
  isFetchingRemoveBrand: false,
  isFetchingBrandInfos: false,
  error: freshErrorState,
};

export default function brand(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_BRANDS_FETCHING:
      return { ...state, isFetchingAllBrands: true };
    case actionTypes.GET_ALL_BRANDS_SUCCESS:
      return {
        ...state,
        allBrands: payload.brands,
        isFetchingAllBrands: false,
        error: freshErrorState,
      };
    case actionTypes.GET_ALL_BRANDS_FAILURE:
      return {
        ...state,
        isFetchingAllBrands: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.GET_USER_BRANDS_FETCHING:
      return { ...state, isFetchingUserBrands: true };
    case actionTypes.GET_USER_BRANDS_SUCCESS:
      return {
        ...state,
        userBrands: payload.brands,
        isFetchingUserBrands: false,
        error: freshErrorState,
      };
    case actionTypes.GET_USER_BRANDS_FAILURE:
      return {
        ...state,
        isFetchingUserBrands: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.GET_BRANDS_BY_POPULARITY_FETCHING:
      return { ...state, isFetchingBrandsByPopularity: true };
    case actionTypes.GET_BRANDS_BY_POPULARITY_SUCCESS:
      return {
        ...state,
        brandsByPopularity: payload.brandsByPopularity,
        isFetchingBrandsByPopularity: false,
        error: freshErrorState,
      };
    case actionTypes.GET_BRANDS_BY_POPULARITY_FAILURE:
      return {
        ...state,
        isFetchingBrandsByPopularity: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.ADD_BRAND_FETCHING:
      return { ...state, isFetchingAddBrand: true };
    case actionTypes.ADD_BRAND_SUCCESS:
      return {
        ...state,
        userBrands: state.userBrands.concat(payload.successfulInserts),
        isFetchingAddBrand: false,
        error: freshErrorState,
      };
    case actionTypes.ADD_BRAND_FAILURE:
      return {
        ...state,
        isFetchingAddBrand: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.REMOVE_BRAND_FETCHING:
      return { ...state, isFetchingRemoveBrand: true };
    case actionTypes.REMOVE_BRAND_SUCCESS:
      return {
        ...state,
        userBrands: state.userBrands.filter(brand => payload.successfulDeletes.indexOf(brand.name) < 0),
        isFetchingRemoveBrand: false,
        error: freshErrorState,
      };
    case actionTypes.REMOVE_BRAND_FAILURE:
      return {
        ...state,
        isFetchingRemoveBrand: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.GET_BRAND_INFOS_FETCHING:
      return { ...state, isFetchingBrandInfos: true };
    case actionTypes.GET_BRAND_INFOS_SUCCESS:
      return {
        ...state,
        brandInfos: payload.brandInfos,
        isFetchingBrandInfos: false,
        error: freshErrorState,
      };
    case actionTypes.GET_BRAND_INFOS_FAILURE:
      return {
        ...state,
        isFetchingBrandInfos: false,
        error: { status: true, message: payload.message },
      };

    default:
      return state;
  }
}
