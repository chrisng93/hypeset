/**
 * Script to grab all designers (and their # of current sales) sold on Grailed
 */

import request from 'request';
import cheerio from 'cheerio';

export async function parseGrailedDesigners(tries = 1) {
  return new Promise((resolve, reject) => {
    request(`${process.env.GRAILED_URL}/designers`, (err, res) => {
      if (!res) {
        if (tries <= 5) {
          resolve(parseGrailedDesigners(tries + 1));
          return;
        }
        reject({ brandNames: [], brandPopularity: [] });
        return;
      }
      const $ = cheerio.load(res.body);
      const scripts = $('script');
      const designerScript = $(scripts[3]).text();
      const designersRaw = designerScript.split('\n')[1];
      if (designersRaw) {
        const designersCut = designersRaw.slice(21, designersRaw.length - 6);
        const designersData = findPopularDesigners(designersCut);
        resolve(designersData);
      } else {
        if (tries <= 5) {
          resolve(parseGrailedDesigners(tries + 1));
        }
        reject({ brandNames: [], brandPopularity: [] });
      }
    });
  });
}

function findPopularDesigners(cutData) {
  const designersArray = JSON.parse(cutData).data;
  const popularDesigners = designersArray.filter(designer => designer.count > 250 && designer.name !== 'Other' && designer.name !== 'Custom');
  const brandNames = popularDesigners.map(designerJSON => designerJSON.name);
  const brandPopularity = popularDesigners.map((designerJSON) => {
    return {
      name: designerJSON.name,
      count: designerJSON.count,
    }
  });
  return { brandNames, brandPopularity };
}
