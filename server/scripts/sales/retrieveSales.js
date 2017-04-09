/**
 * Retrieve sales from Reddit and insert into database
 */

import moment from 'moment';
import snoowrap from 'snoowrap';
import winston from 'winston';
import m from '../../models';
import { retrieveRedditFmfSales } from './redditFmfScript';

const logger = winston.loggers.get('scripts');

export async function retrieveSales(availableBrands, newBrand = false) {
  try {
    const latestSale = await m.Info.find({ where: { type: 'Sale' }, order: 'date DESC' });
    const daysBefore = process.env.NODE_ENV === 'production' ? 365 : 30;
    const latestSaleDate = (latestSale && !newBrand) ? latestSale.date : moment().subtract(daysBefore, 'days');
    const reddit = await m.Site.find({ where: { name: 'Reddit' } });

    const r = new snoowrap({
      userAgent: 'hypeset',
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      refreshToken: process.env.REDDIT_REFRESH_TOKEN,
    });

    logger.debug('Started retrieving Reddit sales', { type: 'Sale', site: 'Reddit', action: 'start retrieve' });
    const sales = await retrieveRedditFmfSales(r, [], latestSaleDate, availableBrands, reddit.id);
    logger.debug('Finished retrieving Reddit sales', { type: 'Sale', site: 'Reddit', action: 'finish retrieve' });

    for (let i = 0; i < sales.length; i++) {
      const sale = await m.Info.updateOrCreate(sales[i], 'Sale');
      for (let j = 0; j < sales[i].brands.length; j++) {
        const brand = await m.Brand.findByName(sales[i].brands[j]);
        sale.addBrand(brand);
      }
    }
    logger.debug('Finished inserting sales into database', { type: 'Sale', action: 'finish insert' });
  } catch(err) {
    logger.error('Error retrieving sales', { type: 'Sale', action: 'retrieve', err: JSON.stringify(err.message) });
  }
}
