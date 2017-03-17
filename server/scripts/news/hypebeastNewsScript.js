/**
 * Created by chrisng on 2/22/17.
 */
import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import { findBrands } from '../../utils/scriptHelpers';

export async function parseHypebeastNews(articles = [], availableBrands, page = 1, latestArticleDate, hypebeastId) {
  return new Promise((resolve) => {
    let continueParsing = true;
    request(`${process.env.HYPEBEAST_URL}/news/page/${page}`, (err, res) => {
      const $ = cheerio.load(res.body);
      $('.post-box').each((postIndex, post) => {
        const category = $(`#${post.attribs.id} .category`)[0];
        if (category && (category.attribs.title === 'Footwear' || category.attribs.title === 'Fashion') && continueParsing) {
          const article = {};
          article.SiteId = hypebeastId;
          article.title = post.attribs['data-title'];
          article.url = post.attribs['data-permalink'];

          if (article.title && article.url) {
            const brands = findBrands(article.title, availableBrands);
            if (brands) {
              article.brands = brands;
              const thumbnailElement = $(`#${post.attribs.id} .img-responsive`)[0];
              if (thumbnailElement) {
                article.imgUrl = thumbnailElement.attribs.src;
              }

              let timeElement = $(`#${post.attribs.id} .timeago`)[0];
              let pst;
              if (!timeElement) {
                timeElement = $(`#${post.attribs.id} .time`)[0];
                pst = new Date(timeElement.children[0].children[0].data);
              } else {
                pst = new Date(timeElement.attribs.datetime);
              }
              article.date = moment(pst, 'YYYY-MM-DD hh:mm');

              const blurbElement = $(`#${post.attribs.id} .post-box-excerpt p`)[0];
              if (blurbElement) {
                article.blurb = blurbElement.children[0].data.trim();
              }

              moment(latestArticleDate).diff(article.date, 'seconds') < 0 ? articles.push(article) : continueParsing = false;
            }
          }
        }
      });
      if (continueParsing) {
        resolve(parseHypebeastNews(articles, availableBrands, page + 1, latestArticleDate, hypebeastId));
      }
      resolve(articles);
    });
  });
}
