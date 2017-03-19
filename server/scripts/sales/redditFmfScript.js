/**
 * Created by chrisng on 2/22/17.
 */

import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import { findBrands } from '../../utils/scriptHelpers';

const eliminateDuplicates = (array) => {
  const noDuplicates = [];
  for (let i = 0; i < array.length; i++) {
    if (noDuplicates.indexOf(array[i]) < 0) {
      noDuplicates.push(array[i]);
    }
  }
  return noDuplicates;
};

const findLink = (url) => {
  request(url, (err, res) => {
    const $ = cheerio.load(res.body);
    const linkElem = $('.linklisting .usertext-body .md a')[0];
    if (linkElem) {
      return linkElem.attribs.href;
    }
    return null;
  });
};

export async function retrieveRedditFmfSales(r, sales = [], latestSaleDate, availableBrands, redditId) {
  return new Promise((resolve) => {
    let continueSearching = true;
    r.getSubreddit('frugalmalefashion')
      .getNew({ limit: 100 })
      .forEach((post) => {
        const sale = {
          title: post.title,
          url: post.url,
          blurb: post.selftext,
          permalink: post.permalink,
          date: moment.unix(post.created_utc).format(),
          thumbnail: post.thumbnail,
          SiteId: redditId,
        };
        if (moment(latestSaleDate).diff(sale.date, 'seconds')) {
          continueSearching = false;
          return;
        }

        if (sale.url === `${process.env.REDDIT_URL}${sale.permalink}`) {
          sale.url = findLink(sale.url);
        }
        if (!sale.url) {
          return null;
        }

        const brandsViaLink = findBrands(sale.url, availableBrands) || [];
        const brandsViaTitle = findBrands(sale.title, availableBrands) || [];
        sale.brands = eliminateDuplicates(brandsViaLink.concat(brandsViaTitle));
        sales.push(sale);
      })
      .then(() => {
        if (continueSearching) {
          resolve(retrieveRedditFmfSales(r, sales, latestSaleDate, availableBrands, redditId));
        }
        resolve(sales);
      });
  });
}
