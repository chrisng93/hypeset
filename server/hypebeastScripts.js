/**
 * Created by chrisng on 2/22/17.
 */

const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

const now = moment().subtract(1, 'days').unix();

// TODO: change latestArticleDate logic
const parseHypebeastArticles = (articles = [], page = 1, latestArticleDate = now - 3) => {
  let continueParsing = true;
  request(`https://hypebeast.com/news/page/${page}`, (err, res) => {
    const $ = cheerio.load(res.body);
    $('.post-box').each((postIndex, post) => {
      const category = $(`#${post.attribs.id} .category`)[0];
      if ((category.attribs.title === 'Footwear' || category.attribs.title === 'Fashion') && continueParsing) {
        const article = {};
        article.source = 'hypebeast';
        article.title = post.attribs['data-title'];
        article.url = post.attribs['data-permalink'];

        const thumbnailElement = $(`#${post.attribs.id} .img-responsive`)[0];
        if (thumbnailElement) {
          article.imgUrl = thumbnailElement.attribs.src;
        }

        const authorElement = $(`#${post.attribs.id} .article-author`)[0];
        if (authorElement) {
          article.author = authorElement.children[0].data;
          article.authorUrl = authorElement.attribs.href;
        }

        let timeElement = $(`#${post.attribs.id} .timeago`)[0];
        let pst;
        if (!timeElement) {
          timeElement = $(`#${post.attribs.id} .time`)[0];
          pst = new Date(timeElement.children[0].children[0].data);
        } else {
          pst = new Date(timeElement.attribs.datetime);
        }
        article.date = moment(pst, 'YYYY-MM-DD').unix();

        // TODO: find out how to parse article brand
        // article.brand

        if (moment(latestArticleDate).diff(article.date, 'seconds') < 0) {
          articles.push(article);
        } else {
          continueParsing = false;
        }
      }
    });
    if (continueParsing) {
      parseHypebeastArticles(articles, page + 1, latestArticleDate);
    }
  });
};

module.exports = { parseHypebeastArticles };
