/**
 * Create selectors for news store
 */

import { createSelector } from 'reselect';
import { isAuthenticatedSelector } from './userSelectors';
import { userBrandsSelector } from './brandSelectors';

const newsStateSelector = state => state.news;

export const newsSelector = createSelector(
  newsStateSelector,
  userBrandsSelector,
  isAuthenticatedSelector,
  (newsState, userBrands, isAuthenticated) => {
    if (isAuthenticated) {
      const userBrandNames = userBrands.map(brand => brand.name);
      return newsState.news.filter((news) => {
        for (let i = 0; i < news.Brands.length; i++) {
          if (userBrandNames.indexOf(news.Brands[i].name) < 0) {
            return false;
          }
        }
        return true;
      });
    } else {
      return newsState.news;
    }
  }
);

export const isFetchingAllNewsSelector = createSelector(
  newsStateSelector,
  newsState => newsState.isFetchingAllNews
);

export const isFetchingOwnNewsSelector = createSelector(
  newsStateSelector,
  newsState => newsState.isFetchingOwnNews
);

export const newsErrorSelector = createSelector(
  newsStateSelector,
  newsState => newsState.error
);
