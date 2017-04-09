/**
 * Script to grab all designers sold on HBX
 */

import request from 'request';
import cheerio from 'cheerio';

export async function parseHbxDesigners() {
  return new Promise((resolve) => {
    request(`${process.env.HBX_URL}/brands`, (err, res) => {
      const brands = [];
      const $ = cheerio.load(res.body);
      $('.brand-name-link').each((rowIndex, row) => {
        brands.push(row.children[1].attribs.title);
      });
      resolve(brands)
    });
  });
}
