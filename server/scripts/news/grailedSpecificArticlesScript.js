/**
 * Created by chrisng on 3/13/17.
 */
import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import { findBrands, findTag } from '../../utils/scriptUtils';

const now = moment().subtract(1, 'days').unix();
const xago = moment().subtract(8, 'days').unix();

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
    console.error(`Error parsing Grailed articles: ${err}`);
  }
}

async function parseWeekendReadingArticle(article, availableBrands) {
  try {
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
      if (validBrands.length) {
        return article;
      }
      return null;
    });
  } catch(err) {
    console.error(`Error parsing Grailed Weekend Reading articles: ${err}`);
  }
}

async function parseGrailFitsArticle(article, availableBrands) {
  try {
    return parseDataListings(article, '.listings', availableBrands);
  } catch(err) {
    console.error(`Error parsing Grailed Grail Fits articles: ${err}`);
  }
}

async function parseStaffPicksArticle(article, availableBrands) {
  try {
    return parseDataListings(article, '.listings', availableBrands);
  } catch(err) {
    console.error(`Error parsing Grailed Staff Picks articles: ${err}`);
  }
}

const parseDataListings = (article, classSelector, availableBrands) => {
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
    if (validBrands.length) {
      return article;
    }
    return null;
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
