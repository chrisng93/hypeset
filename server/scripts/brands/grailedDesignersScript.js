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
      const grailedDesignersRaw = designerScript.split('\n')[2];
      const hypeDesignersRaw = designerScript.split('\n')[3];

      if (grailedDesignersRaw && hypeDesignersRaw) {
        const grailedDesignersCut = grailedDesignersRaw.slice(29, grailedDesignersRaw.length - 6);
        const hypeDesignersCut = hypeDesignersRaw.slice(26, hypeDesignersRaw.length - 6);

        const grailedDesignersData = findPopularDesigners(grailedDesignersCut);
        const hypeDesignersData = findPopularDesigners(hypeDesignersCut);

        const brandNames = grailedDesignersData.brandNames.concat(hypeDesignersData.brandNames);
        const brandPopularity = hypeDesignersData.brandPopularity;
        resolve({ brandNames, brandPopularity })
      } else {
        resolve({ brandNames: [], brandPopularity: [] });
      }
    });
  });
}

function findPopularDesigners(cutData) {
  const designersArray = JSON.parse(cutData).data;
  const popularDesigners = designersArray.filter(designerJSON => designerJSON.count > 100);
  const brandNames = popularDesigners.map(designerJSON => designerJSON.name);
  const brandPopularity = popularDesigners.map((designerJSON) => {
    return {
      name: designerJSON.name,
      count: designerJSON.count,
    }
  });
  return { brandNames, brandPopularity };
}
