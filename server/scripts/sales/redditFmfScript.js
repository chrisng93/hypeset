/**
 * Created by chrisng on 2/22/17.
 */

import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import snoowrap from 'snoowrap';
import m from '../../models';
import { findBrands } from '../../utils/scriptHelpers';

const eliminateDuplicates = (array) => {
  const noDuplicates = [];
  for (let i = 0; i < array.length; i++) {
    if (noDuplicates.indexOf(array[i]) < 0) {
      noDuplicates.push(array[i]);
    }
  }
  return noDuplicates;
};

const findLink = (url) => {
  request(url, (err, res) => {
    const $ = cheerio.load(res.body);
    const linkElem = $('.linklisting .usertext-body .md a')[0];
    if (linkElem) {
      return linkElem.attribs.href;
    }
    return null;
  });
};

async function handlePost(post, availableBrands) {
  if (post.url === `${process.env.REDDIT_URL}${post.permalink}`) {
    post.url = findLink(post.url);
  }
  if (!post.url) {
    return;
  }

  const brandsViaLink = findBrands(post.url, availableBrands);
  const brandsViaTitle = findBrands(post.title, availableBrands);
  let brands = eliminateDuplicates(brandsViaLink.concat(brandsViaTitle));
  if (brands) {
    await m.Info.updateOrCreate(post, 'Sale');
  }
}

export async function parseRedditFmf() {
  const r = new snoowrap({
    userAgent: 'chris',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN,
  });
  let availableBrands = await m.Brand.findAll();
  availableBrands = availableBrands.map(brand => brand.name);
  const reddit = await m.Site.find({ where: { name: 'Reddit' } });

  r.getSubreddit('frugalmalefashion')
    .getNew({ limit: 100 })
    .forEach((post) => {
      // TODO: add clause to skip if date is past latest grab date
      const updatedPost = {
        title: post.title,
        url: post.url,
        blurb: post.selftext,
        permalink: post.permalink,
        date: moment.unix(post.created_utc).format(),
        thumbnail: post.thumbnail,
        SiteId: reddit.id,
      };
      handlePost(updatedPost, availableBrands);
    });
}
