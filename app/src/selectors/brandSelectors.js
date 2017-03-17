/**
 * Created by chrisng on 3/14/17.
 */
import { createSelector } from 'reselect';
import { toJS } from 'immutable';

const brandStateSelector = state => state.brand.toJS();

export const allBrandsSelector = createSelector(
  brandStateSelector,
  brandState => brandState.allBrands
);

export const userBrandsSelector = createSelector(
  brandStateSelector,
  brandState => brandState.userBrands
);

export const brandsByPopularitySelector = createSelector(
  brandStateSelector,
  brandState => brandState.brandsByPopularity
);

export const brandErrorSelector = createSelector(
  brandStateSelector,
  brandState => brandState.error
);

export const availableBrandsSelector = createSelector(
  allBrandsSelector,
  userBrandsSelector,
  (allBrands, userBrands) => {
    const userBrandNames = userBrands.map(brand => brand.name);
    return allBrands.filter(brand => userBrandNames.indexOf(brand.name) < 0);
  }
);
