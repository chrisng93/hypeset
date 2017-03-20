/**
 * Created by chrisng on 3/15/17.
 */
import moment from 'moment';
import { createSelector } from 'reselect';
import { toJS } from 'immutable';

const newsStateSelector = state => state.news.toJS();

export const newsSelector = createSelector(
  newsStateSelector,
  newsState => newsState.news.sort((a, b) => moment(a.date).diff(b.date, 'seconds') < 0)
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
