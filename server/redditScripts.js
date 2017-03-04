/**
 * Created by chrisng on 2/22/17.
 */

const request = require('request');
const cheerio = require('cheerio');
const snoowrap = require('snoowrap');

const findLink = (url) => {
  request(url, (err, res, body) => {
    const $ = cheerio.load(res.body);
    const linkElem = $('.linklisting .usertext-body .md a')[0];
    if (linkElem) {
      return linkElem.attribs.href;
    }
    return null;
  });
};

const handlePost = (post) => {
  let link;
  if (post.url === `https://www.reddit.com${post.permalink}`) {
    link = findLink(post.url);
  }
  if (!link) {
    return;
  }

  // if brand name exists in url
  // insert into db
  // else
  // scrape site to see if exists in brand
};

const grabLatestFmfArticles = () => {
  const r = new snoowrap({
    userAgent: 'chris',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN,
  });

  r.getSubreddit('frugalmalefashion')
    .getNew({limit: 100})
    .forEach((post) => {
      // add clause to skip if date is past latest grab date
      const updatedPost = {
        id: post.id,
        title: post.title,
        url: post.url,
        permalink: post.permalink,
        createdUtc: post.created_utc,
      };
      handlePost(updatedPost);
    });
};

grabLatestFmfArticles();

module.exports = { grabLatestFmfArticles };
