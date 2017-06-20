/**
 * Parse specific Grailed articles that are published often (Weekend Reading, Grail Fits, Staff Picks)
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
    logger.error('Error parsing Grailed articles', { type: 'News', action: 'parse', site: 'Grailed', err: JSON.stringify(err.message) });
  }
}

async function parseWeekendReadingArticle(article, availableBrands, tries = 1) {
  return new Promise((resolve, reject) => {
    request(article.url, (err, res) => {
      if (!res) {
        if (tries <= 5) {
          resolve(parseWeekendReadingArticle(article, availableBrands, tries + 1));
          return;
        }
        reject();
        return;
      }
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
  return new Promise((resolve, reject) => {
    parseDataListings(article, '.listings', availableBrands, resolve, reject);
  });
}

async function parseStaffPicksArticle(article, availableBrands) {
  return new Promise((resolve, reject) => {
    parseDataListings(article, '.listings', availableBrands, resolve, reject);
  })
}

const parseDataListings = (article, classSelector, availableBrands, resolve, reject, tries = 1) => {
  request(article.url, (err, res) => {
    if (!res) {
      if (tries <= 5) {
        resolve(parseDataListings(article, classSelector, availableBrands, resolve, reject, tries + 1));
        return;
      }
      reject();
      return;
    }
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
    validBrands.length > 0 ? resolve(article) : reject();
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
