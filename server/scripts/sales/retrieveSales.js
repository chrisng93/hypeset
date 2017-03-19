/**
 * Created by chrisng on 3/19/17.
 */
import moment from 'moment';
import snoowrap from 'snoowrap';
import m from '../../models';
import { retrieveRedditFmfSales } from './redditFmfScript';

export async function retrieveSales() {
  const latestSale = await m.Info.find({ where: { type: 'Sale' }, order: 'date DESC' });
  let latestSaleDate = null;
  if (!latestSale) {
    latestSaleDate = moment().subtract(30, 'days');
  } else {
    latestSaleDate = latestSale.date;
  }
  const reddit = await m.Site.find({ where: { name: 'Reddit' } });
  const brandModels = await m.Brand.findAll();
  const availableBrands = brandModels.map(model => model.name);

  const r = new snoowrap({
    userAgent: 'hypeset',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN,
  });

  const sales = await retrieveRedditFmfSales(r, [], latestSaleDate, availableBrands, reddit.id);

  for (let i = 0; i < sales.length; i++) {
    const sale = await m.Info.updateOrCreate(sales[i], 'Sale');
    for (let i = 0; i < sales[i].brands.length; i++) {
      const brand = await m.Brand.findByName(sale.brands[i]);
      sale.addBrand(brand);
    }
  }
}
