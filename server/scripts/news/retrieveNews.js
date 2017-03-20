/**
 * Created by chrisng on 3/13/17.
 */
import moment from 'moment';
import m from '../../models';
import { parseHypebeastNews } from './hypebeastNewsScript';
import { parseGrailedArticles } from './grailedNewsScript';
import { parseGrailedSpecificArticles } from './grailedSpecificArticlesScript';

export async function retrieveNews(availableBrands) {
  const latestNews = await m.Info.find({ where: { type: 'News' }, order: 'date DESC' });
  let latestNewsDate = null;
  latestNews ? latestNewsDate = latestNews.date : latestNewsDate = moment().subtract(30, 'days');
  const grailed = await m.Site.find({ where: { name: 'Grailed' } });
  const hypebeast = await m.Site.find({ where: { name: 'Hypebeast' } });

  const initialGrailedState = {
    weekendReading: [],
    grailFits: [],
    staffPicks: [],
    news: [],
  };

  console.log('Started to retrieve news..');
  const hypebeastNews = await parseHypebeastNews([], availableBrands, 1, latestNewsDate, hypebeast.id);
  const grailedArticles = await parseGrailedArticles(initialGrailedState, availableBrands, 1, latestNewsDate, grailed.id);
  const grailedWeekendReading = await parseGrailedSpecificArticles('Weekend Reading', grailedArticles.weekendReading, availableBrands);
  const grailedGrailFits = await parseGrailedSpecificArticles('Grail Fits', grailedArticles.grailFits, availableBrands);
  const grailedStaffPicks = await parseGrailedSpecificArticles('Staff Picks', grailedArticles.staffPicks, availableBrands);
  const allNews = hypebeastNews.concat(grailedArticles.news).concat(grailedWeekendReading).concat(grailedGrailFits).concat(grailedStaffPicks);
  console.log('Finished retrieving news..');

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
  console.log('Finished inserting news into table..');
}
