/**
 * Created by chrisng on 3/13/17.
 */
import moment from 'moment';
import m from '../../models';
import { parseHypebeastNews } from './hypebeastNewsScript';
import { parseGrailedNews } from './grailedNewsScript';

const now = moment().subtract(1, 'days').unix();

async function retrieveNews() {
  // get latest news article from database and use that as the starting time
  // const latestNews = await m.Info.findNews();
  const brandModels = await m.Brand.findAll();
  const availableBrands = brandModels.map((model) => {
    return model.getDataValue('name');
  });
  // const hypebeastNews = await parseHypebeastNews([], availableBrands, 1, now - 10);
  // const grailedNews = await parseGrailedNews([], availableBrands, 1, now - 10);
  // when inserting, check for duplicates
}

module.exports = { retrieveNews };
