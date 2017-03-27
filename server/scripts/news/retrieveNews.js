/**
 * Created by chrisng on 3/13/17.
 */
import moment from 'moment';
import winston from 'winston';
import m from '../../models';
import { parseHypebeastNews } from './hypebeastNewsScript';
import { parseGrailedArticles } from './grailedNewsScript';
import { parseGrailedSpecificArticles } from './grailedSpecificArticlesScript';

const logger = winston.loggers.get('scripts');

export async function retrieveNews(availableBrands, newBrand = false) {
  try {
    const latestNews = await m.Info.find({ where: { type: 'News' }, order: 'date DESC' });
    let latestNewsDate;
    (latestNews && !newBrand) ? latestNewsDate = latestNews.date : latestNewsDate = moment().subtract(30, 'days');
    const grailed = await m.Site.find({ where: { name: 'Grailed' } });
    const hypebeast = await m.Site.find({ where: { name: 'Hypebeast' } });

    const initialGrailedState = {
      weekendReading: [],
      grailFits: [],
      staffPicks: [],
      news: [],
    };

    logger.debug('Started retrieving news', { type: 'News', action: 'start retrieve' });
    logger.debug('Started parsing Hypebeast news', { type: 'News', site: 'Hypebeast', action: 'start parse' });
    const hypebeastNews = await parseHypebeastNews([], availableBrands, 1, latestNewsDate, hypebeast.id);
    logger.debug('Finished parsing Hypebeast news', { type: 'News', site: 'Hypebeast', action: 'finish parse' });
    logger.debug('Started parsing Grailed articles', { type: 'News', site: 'Grailed', action: 'start parse' });
    const grailedArticles = await parseGrailedArticles(initialGrailedState, availableBrands, 1, latestNewsDate, grailed.id);
    logger.debug('Finished parsing Grailed articles', { type: 'News', site: 'Grailed', action: 'finish parse' });
    logger.debug('Started parsing Grailed Weekend Reading', { type: 'News', site: 'Grailed', action: 'start parse' });
    const grailedWeekendReading = await parseGrailedSpecificArticles('Weekend Reading', grailedArticles.weekendReading, availableBrands);
    logger.debug('Finished parsing Grailed Weekend Reading', { type: 'News', site: 'Grailed', action: 'finish parse' });
    logger.debug('Started parsing Grailed Grail Fits', { type: 'News', site: 'Grailed', action: 'start parse' });
    const grailedGrailFits = await parseGrailedSpecificArticles('Grail Fits', grailedArticles.grailFits, availableBrands);
    logger.debug('Finished parsing Grailed Grail Fits', { type: 'News', site: 'Grailed', action: 'finish parse' });
    logger.debug('Started parsing Grailed Staff Picks', { type: 'News', site: 'Grailed', action: 'start parse' });
    const grailedStaffPicks = await parseGrailedSpecificArticles('Staff Picks', grailedArticles.staffPicks, availableBrands);
    logger.debug('Finished parsing Grailed Staff Picks', { type: 'News', site: 'Grailed', action: 'finish parse' });
    console.log(grailedWeekendReading, grailedGrailFits, grailedStaffPicks)
    const allNews = hypebeastNews.concat(grailedArticles.news).concat(grailedWeekendReading).concat(grailedGrailFits).concat(grailedStaffPicks);
    logger.debug('Finished retrieving news', { type: 'News', action: 'finish retrieve' });

    for (let i = 0; i < allNews.length; i++) {
      const curr = allNews[i];
      let news = await m.Info.find({ where: { url: curr.url } });
      if (!news) {
        news = await m.Info.create({ ...curr, type: 'News' });
      }
      for (let j = 0; j < curr.brands.length; j++) {
        const brand = await m.Brand.findByName(curr.brands[j]);
        news.addBrand(brand);
      }
    }
    logger.debug('Finished inserting news into database', { type: 'News', action: 'finish insert' });
  } catch(err) {
    logger.error('Error retrieving news', { type: 'News', action: 'retrieve', err: JSON.stringify(err) });
  }
}
