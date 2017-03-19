/**
 * Created by chrisng on 3/16/17.
 */
import cron from 'cron';
import { retrieveBrands } from './brands/retrieveBrands';
import { retrieveNews } from './news/retrieveNews';
import { retrieveSales } from './sales/retrieveSales';

export default function runScripts() {
  const CronJob = cron.CronJob;
  const job = new CronJob('* * 01 * * *', onStart, null, true, 'America/Los_Angeles');
  job.start();
};

async function onStart() {
  console.log('Started web scraping scripts..');
  await retrieveBrands();
  const brandModels = await m.Brand.findAll();
  const availableBrands = brandModels.map(model => model.name);
  await retrieveSales(availableBrands);
  await retrieveNews(availableBrands);
  console.log('Finished web scraping scripts..')
}

runScripts();
