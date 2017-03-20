/**
 * Created by chrisng on 3/19/17.
 */
import { createSelector } from 'reselect';
import { toJS } from 'immutable';

const salesStateSelector = state => state.sales.toJS();

export const salesSelector = createSelector(
  salesStateSelector,
  salesState => salesState.sales
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

export const salesErrorSelector = createSelector(
  salesStateSelector,
  salesState => salesState.error
);
