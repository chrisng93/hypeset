/**
 * Created by chrisng on 3/13/17.
 */
import request from 'request';
import cheerio from 'cheerio';
import winston from 'winston';
import { findBrands, findTag } from '../../utils/scriptUtils';

const logger = winston.loggers.get('scripts');

export async function parseGrailedSpecificArticles(type, articles, availableBrands) {
  try {
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
  } catch(err) {
    logger.error('Error parsing Grailed articles', { type: 'News', action: 'parse', site: 'Grailed', err: JSON.stringify(err) });
  }
}

async function parseWeekendReadingArticle(article, availableBrands) {
  return new Promise((resolve) => {
    request(article.url, (err, res) => {
      const $ = cheerio.load(res.body);
      const root = $('.article-wrapper')[0];
      const links = findTag(root, 'a');
      const validBrands = [];
      links.forEach((link) => {
        const brands = findBrands(link.children[0].data, availableBrands);
        if (brands.length) {
          insertNew(validBrands, brands);
        }
      });
      article.brands = validBrands;
      validBrands.length > 0 ? resolve(article) : resolve(null);
    });
  });
}

async function parseGrailFitsArticle(article, availableBrands) {
  return new Promise((resolve) => {
    parseDataListings(article, '.listings', availableBrands, resolve);
  });
}

async function parseStaffPicksArticle(article, availableBrands) {
  return new Promise((resolve) => {
    parseDataListings(article, '.listings', availableBrands, resolve);
  })
}

const parseDataListings = (article, classSelector, availableBrands, resolve) => {
  request(article.url, (err, res) => {
    const $ = cheerio.load(res.body);
    const validBrands = [];
    $(classSelector).each((listingIndex, listing) => {
      const rawListings = listing.attribs['data-listings'];
      const parsedListings = JSON.parse(rawListings);
      parsedListings.forEach((parsedListing) => {
        const brands = findBrands(parsedListing.designer_names, availableBrands);
        if (brands.length) {
          insertNew(validBrands, brands);
        }
      });
    });
    article.brands = validBrands;
    validBrands.length > 0 ? resolve(article) : resolve(null);
  });
};

const insertNew = (array, additions) => {
  for (let i = 0; i < additions.length; i++) {
    if (array.indexOf(additions[i]) < 0) {
      array.push(additions[i]);
    }
  }
  return array;
};
