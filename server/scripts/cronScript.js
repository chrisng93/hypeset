/**
 * Created by chrisng on 3/16/17.
 */
const CronJob = require('cron').CronJob;
import m from '../models';
import { retrieveBrands } from './brands/retrieveBrands';
import { retrieveNews } from './news/retrieveNews';
import { retrieveSales } from './sales/retrieveSales';

export default function runScripts() {
  const job = new CronJob({
    cronTime: '* * 01 * * *',
    onTick,
    start: true,
    // TODO: uncomment when deploy
    runOnInit: true,
  });
  job.start();
  console.log(job.running);
};

async function onTick() {
  try {
    console.log('Started web scraping scripts..');
    await retrieveBrands();
    console.log('Finished retrieving brands..');
    const brandModels = await m.Brand.findAll();
    const availableBrands = brandModels.map(model => model.name);
    await retrieveSales(availableBrands);
    console.log('Finished retrieving sales..');
    await retrieveNews(availableBrands);
    console.log('Finished web scraping scripts..');
  } catch(err) {
    console.error(`Error running cron job: ${err}`)
  }
}

runScripts();
