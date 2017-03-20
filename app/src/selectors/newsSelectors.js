/**
 * Created by chrisng on 3/15/17.
 */
import { createSelector } from 'reselect';
import { toJS } from 'immutable';
import { userBrandsSelector } from './brandSelectors';

const newsStateSelector = state => state.news.toJS();

export const newsSelector = createSelector(
  newsStateSelector,
  userBrandsSelector,
  (newsState, userBrands) => {
    return newsState.news.filter((news) => {
      for (let i = 0; i < news.Brands.length; i++) {
        if (userBrands.indexOf(news.Brands[i]) < 0) {
          return false;
        }
      }
    });
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

export const newsErrorSelector = createSelector(
  newsStateSelector,
  newsState => newsState.error
);
