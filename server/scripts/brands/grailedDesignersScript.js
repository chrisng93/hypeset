/**
 * Created by chrisng on 3/15/17.
 */
import request from 'request';
import cheerio from 'cheerio';

export async function parseGrailedDesigners() {
  return new Promise((resolve) => {
    request(`${process.env.GRAILED_URL}/designers`, (err, res) => {
      const $ = cheerio.load(res.body);
      const scripts = $('script');
      const designerScript = $(scripts[3]).text();
      const designersRaw = designerScript.split('\n')[1];
      const designersCut = designersRaw.slice(21, designersRaw.length - 6);
      const designersData = findPopularDesigners(designersCut);
      resolve(designersData);
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
