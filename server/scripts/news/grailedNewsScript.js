/**
 * Created by chrisng on 3/13/17.
 */
import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import { findBrands, findClass, findTag } from '../../utils/scriptHelpers';

const now = moment().subtract(1, 'days').unix();
const fiveago = moment().subtract(8, 'days').unix();

function formatDate(date) {
  date[0] = moment().month(date[0]).format('MM');
  date[1] = date[1].split('').slice(0, date[1].length - 1).join('');
  return date.join('-');
}

// TODO: parse through certain articles in grailed (best of grailed, top 10, etc.)
const parseGrailedNews = (articles = [], availableBrands = ['needles'], page = 1, latestArticleDate = fiveago) => {
  let continueParsing = true;
  request(`${process.env.GRAILED_URL}/drycleanonly?page=${page}`, (err, res) => {
    const $ = cheerio.load(res.body);
    $('.tertiary-articles-row').each((rowIndex, row) => {
      const article = {};
      article.site = 'grailed';
      article.title = findTag(row, 'h1')[0].children[0].data.trim();
      const date = formatDate(findTag(row, 'h4')[0].children[0].data.trim().split(' '));
      article.date = moment(date, 'MM-DD-YYYY').unix();
      const brands = findBrands(article.title, availableBrands);

      if (brands) {
        article.brands = brands;
        const endpoint = findClass(row, 'tertiary-article')[0].attribs.href;
        article.url = `${process.env.GRAILED_URL}${endpoint}`;
        article.imgUrl = findClass(row, 'hero')[0].attribs.src;
        article.blurb = findClass(row, 'subtitle')[0].children[0].data.trim();

        if (moment(latestArticleDate).diff(article.date, 'seconds') < 0) {
          articles.push(article);
        } else {
          continueParsing = false;
        }
      } else if (moment(latestArticleDate).diff(article.date, 'seconds') < 0) {
        continueParsing = false;
      }
    });
    if (continueParsing) {
      return parseGrailedNews(articles, availableBrands, page + 1, latestArticleDate);
    }
    console.log(articles)
    return articles;
  });
};

parseGrailedNews();

module.exports = { parseGrailedNews };
