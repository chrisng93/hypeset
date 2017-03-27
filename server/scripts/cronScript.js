/**
 * Created by chrisng on 3/16/17.
 */
import winston from 'winston';
const CronJob = require('cron').CronJob;
import m from '../models';
import { retrieveBrands } from './brands/retrieveBrands';
import { retrieveNews } from './news/retrieveNews';
import { retrieveSales } from './sales/retrieveSales';
import { setRedisKeys } from '../utils/redisUtils';

const scriptLogger = winston.loggers.get('scripts');

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
    await setRedisKeys();
    scriptLogger.debug('Finished web scraping scripts', { action: 'finish' });
  } catch(err) {
    scriptLogger.error('Error with web scraping scripts', { err: JSON.stringify(err) });
  }
}

runScripts();
