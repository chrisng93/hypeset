/**
 * Created by chrisng on 2/22/17.
 */

import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import winston from 'winston';
import { findBrands } from '../../utils/scriptUtils';

const logger = winston.loggers.get('scripts');

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

export async function retrieveRedditFmfSales(r, sales = [], latestSaleDate, availableBrands, redditId, offset = null) {
  try {
    let continueSearching = true;
    const posts = await r.getSubreddit('frugalmalefashion').getNew({ limit: 100, after: offset });
    posts.forEach((post) => {
      const sale = {
        title: post.title,
        url: post.url,
        blurb: post.selftext,
        domain: post.domain,
        permalink: post.permalink,
        date: moment.unix(post.created_utc).format(),
        SiteId: redditId,
      };
      if (moment(latestSaleDate).diff(moment(sale.date), 'seconds') > 0) {
        continueSearching = false;
        return;
      }

      if (post.thumbnail.slice(0, 4) === 'http') {
        sale.imgUrl = post.thumbnail;
      }
      if (sale.url === `${process.env.REDDIT_URL}${sale.permalink}`) {
        sale.url = findLink(sale.url);
      }
      if (!sale.url) {
        return null;
      }

      let brands = [];
      brands = brands.concat(findBrands(sale.title, availableBrands, 'title'));
      if (!brands.length) {
        brands = brands.concat(findBrands(sale.domain, availableBrands, 'domain'));
        if (!brands.length) {
          brands = brands.concat(findBrands(sale.url, availableBrands, 'url'));
        }
      }
      sale.brands = brands;
      if (sale.brands.length > 0) {
        sales.push(sale);
      }

      offset = post.name;
    });

    if (continueSearching) {
      return retrieveRedditFmfSales(r, sales, latestSaleDate, availableBrands, redditId, offset);
    }
    return sales;
  } catch(err) {
    logger.error('Error retrieving sales from Reddit', { type: 'Sale', action: 'retrieve', site: 'Reddit', err: JSON.stringify(err.message) });
  }
}
