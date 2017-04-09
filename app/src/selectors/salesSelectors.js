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

export const salesBrandsSelector = createSelector(
  salesSelector,
  (sales) => {
    const brands = [];
    for (let i = 0; i < sales.length; i++) {
      for (let j = 0; j < sales[i].Brands.length; j++) {
        if (brands.indexOf(sales[i].Brands[j].name) < 0) {
          brands.push(sales[i].Brands[j].name);
        }
      }
    }
    return brands;
  }
);

export const salesSitesSelector = createSelector(
  salesSelector,
  (sales) => {
    const sites = [];
    for (let i = 0; i < sales.length; i++) {
      if (sites.indexOf(sales[i].Site.name) < 0) {
        sites.push(sales[i].Site.name);
      }
    }
    return sites;
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
