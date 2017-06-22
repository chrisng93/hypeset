/**
 * Create selectors for sales store
 */

import { createSelector } from 'reselect';
import { isAuthenticatedSelector } from './userSelectors';
import { userBrandsSelector } from './brandSelectors';

const salesStateSelector = state => state.sales;

export const salesSelector = createSelector(
  salesStateSelector,
  userBrandsSelector,
  isAuthenticatedSelector,
  (salesState, userBrands, isAuthenticated) => {
    if (isAuthenticated) {
      const userBrandNames = userBrands.map(brand => brand.name);
      return salesState.sales.filter((sales) => {
        for (let i = 0; i < sales.Brands.length; i++) {
          if (userBrandNames.indexOf(sales.Brands[i].name) < 0) {
            return false;
          }
        }
        return true;
      });
    } else {
      return salesState.sales;
    }
  }
);

export const isFetchingAllSalesSelector = createSelector(
  salesStateSelector,
  salesState => salesState.isFetchingAllSales
);

export const isFetchingOwnSalesSelector = createSelector(
  salesStateSelector,
  salesState => salesState.isFetchingOwnSales
);

export const salesErrorSelector = createSelector(
  salesStateSelector,
  salesState => salesState.error
);
