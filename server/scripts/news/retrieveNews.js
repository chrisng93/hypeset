/**
 * Created by chrisng on 3/13/17.
 */
import moment from 'moment';
import m from '../../models';
import { parseHypebeastNews } from './hypebeastNewsScript';
import { parseGrailedArticles } from './grailedNewsScript';
import { parseGrailedSpecificArticles } from './grailedSpecificArticlesScript';

const now = moment().subtract(1, 'days').unix();

async function retrieveNews() {
  // TODO: get latest news article from database and use that as the starting time
  // const latestNews = await m.Info.findNews();
  const brandModels = await m.Brand.findAll();
  const availableBrands = brandModels.map((model) => {
    return model.getDataValue('name');
  });
  // TODO: update latestArticleDate
  const initialGrailedState = {
    weekendReading: [],
    grailFits: [],
    staffPicks: [],
    news: [],
  };

  // const hypebeastNews = await parseHypebeastNews([], availableBrands, 1, now - 10);
  // const grailedArticles = await parseGrailedArticles(initialGrailedState, availableBrands, 1, now - 10);
  // const grailedWeekendReading = parseGrailedSpecificArticles('Weekend Reading', grailedArticles.weekendReading, availableBrands);
  // const grailedGrailFits = parseGrailedSpecificArticles('Grail Fits', grailedArticles.grailFits, availableBrands);
  // const grailedStaffPicks = parseGrailedSpecificArticles('Staff Picks', grailedArticles.staffPicks, availableBrands);
  const grailedWeekendReading = await parseGrailedSpecificArticles('Weekend Reading', [{url:'https://www.grailed.com/drycleanonly/weekend-reading-17'}], ['patagonia']);
  console.log(grailedWeekendReading);

  // when inserting, check for duplicates
  // insert hypebeastNews, grailedArticles[news], grailedWeekendReading, grailedGrailFits, grailedStaffPicks
}

module.exports = { retrieveNews };
