/**
 * Created by chrisng on 3/13/17.
 */
import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import {findBrands, findClass, findTag, formatDate} from '../../utils/scriptHelpers';

const now = moment().subtract(1, 'days').unix();
const xago = moment().subtract(8, 'days').unix();

async function parseGrailedSpecificArticles(type, articles, availableBrands) {
  const validArticles = [];
  let parseFunction;
  if (type === 'Weekend Reading') {
    parseFunction = parseWeekendReadingArticle;
  } else if (type === 'Grail Fits') {
    parseFunction = parseGrailFitsArticle;
  } else {
    parseFunction = parseStaffPicksArticle;
  }
  for (let i = 0; i < articles.length; i++) {
    let article;
    article = await parseFunction(articles[i], availableBrands);
    if (article) {
      validArticles.push(article);
    }
  }
  return validArticles;
}

async function parseWeekendReadingArticle(article, availableBrands) {
  return new Promise((resolve) => {
    request(article.url, (err, res) => {
      const $ = cheerio.load(res.body);
      const root = $('.article-wrapper')[0];
      const links = findTag(root, 'a');
      let validBrands = [];
      links.forEach((link) => {
        const brands = findBrands(link.children[0].data, availableBrands);
        if (brands) {
          validBrands = validBrands.concat(brands);
        }
      });
      article.brands = validBrands;
      validBrands ? resolve(article) : resolve(null);
    });
  });
}

async function parseGrailFitsArticle(article, availableBrands) {
  request(article.url, (err, res) => {
    const $ = cheerio.load(res.body);
    // parse webpage for brand
  });
}

async function parseStaffPicksArticle(article, availableBrands) {
  request(article.url, (err, res) => {
    const $ = cheerio.load(res.body);
    // parse webpage for brand
  });
}

module.exports = { parseGrailedSpecificArticles };
