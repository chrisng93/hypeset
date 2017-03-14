/**
 * Created by chrisng on 3/13/17.
 */
import moment from 'moment';
import m from '../../models';
import { parseHypebeastNews } from './hypebeastNewsScript';
import { parseGrailedArticles } from './grailedNewsScript';
import { parseGrailedSpecificArticles } from './grailedSpecificArticlesScript';

const now = moment().subtract(5, 'days').unix();

async function retrieveNews() {
  // TODO: get latest news article from database and use that as the starting time
  // const latestNews = await m.Info.findNews();
  const brandModels = await m.Brand.findAll();
  // const availableBrands = brandModels.map((model) => {
  //   return model.getDataValue('name');
  // });
  // TODO: update latestArticleDate
  const initialGrailedState = {
    weekendReading: [],
    grailFits: [],
    staffPicks: [],
    news: [],
  };

  const availableBrands = ['adidas', 'rick owens', 'nike', 'jordan', 'test', 'uniqlo', 'macys', 'your mom']
  const hypebeastNews = await parseHypebeastNews([], availableBrands, 1, now);
  const grailedArticles = await parseGrailedArticles(initialGrailedState, availableBrands, 1, now);
  const grailedWeekendReading = await parseGrailedSpecificArticles('Weekend Reading', grailedArticles.weekendReading, availableBrands);
  const grailedGrailFits = await parseGrailedSpecificArticles('Grail Fits', grailedArticles.grailFits, availableBrands);
  const grailedStaffPicks = await parseGrailedSpecificArticles('Staff Picks', grailedArticles.staffPicks, availableBrands);

  // when inserting, check for duplicates
  // insert hypebeastNews, grailedArticles[news], grailedWeekendReading, grailedGrailFits, grailedStaffPicks
}

module.exports = { retrieveNews };
