/**
 * Create selectors for brand store
 */

import { createSelector } from 'reselect';

const brandStateSelector = state => state.brand;

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

export const brandInfosSelector = createSelector(
  brandStateSelector,
  brandState => brandState.brandInfos
);

export const brandNameSelector = createSelector(
  brandInfosSelector,
  brandInfos => brandInfos.brandName
);

export const brandCondensedNameSelector = createSelector(
  brandInfosSelector,
  brandInfos => brandInfos.brandCondensedName
);

export const brandNewsSelector = createSelector(
  brandInfosSelector,
  brandInfos => brandInfos.brandNews
);

export const brandSalesSelector = createSelector(
  brandInfosSelector,
  brandInfos => brandInfos.brandSales
);

export const isFetchingAllBrandsSelector = createSelector(
  brandStateSelector,
  brandState => brandState.isFetchingAllBrands
);

export const isFetchingUserBrandsSelector = createSelector(
  brandStateSelector,
  brandState => brandState.isFetchingUserBrands
);

export const isFetchingBrandsByPopularitySelector = createSelector(
  brandStateSelector,
  brandState => brandState.isFetchingBrandsByPopularity
);

export const isFetchingAddBrandSelector = createSelector(
  brandStateSelector,
  brandState => brandState.isFetchingAddBrand
);

export const isFetchingRemoveBrandSelector = createSelector(
  brandStateSelector,
  brandState => brandState.isFetchingRemoveBrand
);

export const isFetchingBrandInfosSelector = createSelector(
  brandStateSelector,
  brandState => brandState.isFetchingBrandInfos
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

export const allBrandsByGroupingSelector = createSelector(
  allBrandsSelector,
  allBrands => groupBrands(allBrands)
);

export const availableBrandsByGroupingSelector = createSelector(
  availableBrandsSelector,
  availableBrands => groupBrands(availableBrands)
);

const groupBrands = (brands) => {
  const brandsByGrouping = {};
  const groupings = ['#', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u' ,'v', 'w', 'x', 'y', 'z'];
  groupings.forEach(grouping => brandsByGrouping[grouping] = []);
  brands.forEach(brand => {
    const firstLetter = brand.name[0].toLowerCase();
    if (brandsByGrouping[firstLetter]) {
      brandsByGrouping[firstLetter].push(brand);
    } else {
      brandsByGrouping['#'].push(brand);
    }
  });
  return brandsByGrouping;
};
