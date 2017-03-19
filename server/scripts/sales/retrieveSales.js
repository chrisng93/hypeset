/**
 * Created by chrisng on 3/19/17.
 */
import moment from 'moment';
import snoowrap from 'snoowrap';
import m from '../../models';
import { retrieveRedditFmfSales } from './redditFmfScript';

export async function retrieveSales(availableBrands) {
  const latestSale = await m.Info.find({ where: { type: 'Sale' }, order: 'date DESC' });
  let latestSaleDate = null;
  latestSale ? latestSaleDate = latestSale.date : latestSaleDate = moment().subtract(30, 'days');
  const reddit = await m.Site.find({ where: { name: 'Reddit' } });

  const r = new snoowrap({
    userAgent: 'hypeset',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN,
  });

  const sales = await retrieveRedditFmfSales(r, [], latestSaleDate, availableBrands, reddit.id);
  console.log('Finished finding Reddit sales');

  for (let i = 0; i < sales.length; i++) {
    if (sales[i]) {
      const sale = await m.Info.updateOrCreate(sales[i], 'Sale');
      for (let j = 0; j < sales[i].brands.length; j++) {
        const brand = await m.Brand.findByName(sales[i].brands[j]);
        sale.addBrand(brand);
      }
    }
  }
  console.log('Finished inserting sales into table..');
}
