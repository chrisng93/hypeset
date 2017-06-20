/**
 * Script to grab relevant articles from Grailed
 */

import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import { findBrands, findClass, findTag, formatDate } from '../../utils/scriptUtils';

export async function parseGrailedArticles(articles, availableBrands, page = 1, latestArticleDate, grailedId, tries = 1) {
  return new Promise((resolve, reject) => {
    let continueParsing = true;
    request(`${process.env.GRAILED_URL}/drycleanonly?page=${page}`, (err, res) => {
      if (!res) {
        if (tries <= 5) {
          resolve(parseGrailedArticles(articles, availableBrands, page, latestArticleDate, grailedId, tries + 1));
          return;
        }
        articles.length ? resolve(articles) : reject(articles);
        return;
      }
      const $ = cheerio.load(res.body);
      $('.tertiary-articles-row').each((rowIndex, row) => {
        const article = {};
        article.SiteId = grailedId;
        article.title = findTag(row, 'h1')[0].children[0].data.trim();
        const date = formatDate(findTag(row, 'h4')[0].children[0].data.trim().split(' '));
        article.date = moment(date, 'MM-DD-YYYY');
        const endpoint = findClass(row, 'tertiary-article')[0].attribs.href;
        article.url = `${process.env.GRAILED_URL}${endpoint}`;
        article.imgUrl = findClass(row, 'hero')[0].attribs.src;
        article.blurb = findClass(row, 'subtitle')[0].children[0].data.trim();
        console.log(article.title)

        // separate parsing for weekend reading, the best #grailfits of the week, and staff picks
        const titleWords = article.title.split(' ');
        if (titleWords.length > 1 && titleWords.slice(0, 2).join(' ') === 'Weekend Reading:') {
          articles.weekendReading.push(article);
        } else if (titleWords.length > 5 && titleWords.slice(0, 7).join(' ') === 'The Best #GrailFits Of The Week') {
          articles.grailFits.push(article);
        } else if (titleWords.length > 1 && titleWords.slice(0, 2).join(' ') === 'Staff Picks:') {
          articles.staffPicks.push(article);
        } else {
          const brands = findBrands(article.title, availableBrands);
          if (brands.length && moment(latestArticleDate).diff(article.date, 'seconds') < 0) {
            article.brands = brands;
            articles.news.push(article);
          }
        }
        if (moment(latestArticleDate).diff(article.date, 'seconds') > 0) {
          continueParsing = false;
        }
      });
      if (continueParsing && $('.tertiary-articles-row').length) {
        resolve(parseGrailedArticles(articles, availableBrands, page + 1, latestArticleDate, grailedId, tries));
      }
      resolve(articles);
    });
  });
}
