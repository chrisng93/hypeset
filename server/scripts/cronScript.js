/**
 * Created by chrisng on 3/16/17.
 */
import winston from 'winston';
const CronJob = require('cron').CronJob;
import m from '../models';
import redisClient from '../db/redis';
import { retrieveBrands } from './brands/retrieveBrands';
import { retrieveNews } from './news/retrieveNews';
import { retrieveSales } from './sales/retrieveSales';

const scriptLogger = winston.loggers.get('scripts');
const redisLogger = winston.loggers.get('redis');
const infoLogger = winston.loggers.get('infoApi');

export default function runScripts() {
  const job = new CronJob({
    cronTime: '* * 01 * * *',
    onTick,
    start: true,
    // TODO: uncomment when deploy
    runOnInit: true,
  });
  job.start();
};

async function onTick() {
  try {
    scriptLogger.debug('Started web scraping scripts', { action: 'start' });
    await retrieveBrands();
    scriptLogger.debug('Finished retrieving brands', { type: 'Brands', action: 'retrieve' });
    const brandModels = await m.Brand.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    const availableBrands = brandModels.map(model => model.name);
    await retrieveSales(availableBrands);
    scriptLogger.debug('Finished retrieving sales', { type: 'Sales', action: 'retrieve' });
    await retrieveNews(availableBrands);
    scriptLogger.debug('Finished retrieving news', { type: 'News', action: 'retrieve' });
    await setRedisKeys(brandModels);
    scriptLogger.debug('Finished web scraping scripts', { action: 'finish' });
  } catch(err) {
    scriptLogger.error('Error with web scraping scripts', { err: JSON.stringify(err) });
  }
}

const createInfoQuery = (type) => {
  return {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { type },
    include: [
      { model: m.Brand, attributes: ['name'] },
      { model: m.Site, attributes: ['name'] },
    ],
    limit: 40,
    order: 'date DESC'
  }
};

async function setRedisKeys(allBrands) {
  try {
    // set all brands, top 40 news articles, top 40 sales articles, top brand popularities, top 20 news and sales for top brand popularities
    const top40News = await m.Info.findAll(createInfoQuery('News'));
    const top40Sales = await m.Info.findAll(createInfoQuery('Sale'));
    const top20Brands = await m.BrandPopularity.findAll({
      attributes: { exclude: ['date', 'batch', 'createdAt', 'updatedAt'] },
      include: [{ model: m.Brand, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
      limit: 20,
      order: [[{ raw: 'batch DESC, count DESC' }]]
    });
    const top20BrandInfos = {};
    for (let i = 0; i < top20Brands.length; i++) {
      top20BrandInfos[top20Brands[i].Brand.condensedName] = await getInfoForBrand(top20Brands[i].Brand.id);
    }
    await redisClient.set('top40News', JSON.stringify(top40News));
    await redisClient.set('top40Sales', JSON.stringify(top40Sales));
    await redisClient.set('allBrands', JSON.stringify(allBrands));
    await redisClient.set('top20Brands', JSON.stringify(top20Brands));
    await redisClient.set('top20BrandInfos', JSON.stringify(top20BrandInfos));
  } catch(err) {
    redisLogger.error('Error setting Redis keys after web scraping scripts', { err: JSON.stringify(err) });
  }
}

async function getInfoForBrand(brandId) {
  try {
    const brandNews = await m.Info.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { type: 'News' },
      include: [{
        model: m.Brand,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { id: brandId } }],
      limit: 20,
      subQuery: false,
    });
    const brandSales = await m.Info.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { type: 'News' },
      include: [{
        model: m.Brand,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { id: brandId } }],
      limit: 20,
      subQuery: false,
    });
    return { brandNews: brandNews || [], brandSales: brandSales || [] };
  } catch(err) {
    infoLogger.warn('Error retrieving info for brand', { brand: brandId, action: 'retrieve' });
  }
}

runScripts();
