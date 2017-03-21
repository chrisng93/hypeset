/**
 * Created by chrisng on 3/15/17.
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

export const newsBrandsSelector = createSelector(
  newsSelector,
  (news) => {
    const brands = [];
    for (let i = 0; i < news.length; i++) {
      for (let j = 0; j < news[i].Brands.length; j++) {
        if (brands.indexOf(news[i].Brands[j].name) < 0) {
          brands.push(news[i].Brands[j].name);
        }
      }
    }
    return brands;
  }
);

export const newsSitesSelector = createSelector(
  newsSelector,
  (news) => {
    const sites = [];
    for (let i = 0; i < news.length; i++) {
      if (sites.indexOf(news[i].Site.name) < 0) {
        sites.push(news[i].Site.name);
      }
    }
    return sites;
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
