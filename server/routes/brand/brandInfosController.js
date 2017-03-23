/**
 * Created by chrisng on 3/21/17.
 */
import m from '../../models';
import redisClient from '../../db/redis';
import { sendError } from '../../utils/commonErrorHandling';

function createBrandInfoQuery(type, brandName, offset, limit) {
  return {
    attributes: ['name', 'condensedName'],
    where: { condensedName: brandName },
    include: [{ model: m.Info, where: { type }, order: 'date ASC' }],
    offset,
    limit,
    subQuery: false,
  };
}

async function retrieveBrandInfos(req, res) {
  const { name } = req.params;
  let { offset, limit } = req.query;
  try {
    let cachedTopBrands = await redisClient.getAsync('top20Brands');
    cachedTopBrands = JSON.parse(cachedTopBrands) || [];
    const topBrandCondensedNames = cachedTopBrands.map(brandModel => brandModel.brand.condensedName);
    let index = topBrandCondensedNames.indexOf(name);
    offset ? offset = parseInt(offset) : offset = 0;
    limit ? limit = parseInt(limit) : limit = 20;

    if (offset === 0 && limit === 20 && !cachedTopBrands && index < 0) {
      const newsQuery = createBrandInfoQuery('News', name, offset, limit);
      const salesQuery = createBrandInfoQuery('Sale', name, offset, limit);
      const brand = await m.Brand.find({ attributes: ['name', 'condensedName'], where: { condensedName: name } });
      const brandNews = await m.Brand.find(newsQuery) || {};
      const brandSales = await m.Brand.find(salesQuery) || {};
      console.log(`Retrieved news and sales for brand ${name}`);
      const brandInfos = {
        brandName: brand.name,
        brandCondensedName: brand.condensedName,
        brandNews: brandNews.Infos || [],
        brandSales: brandSales.Infos || [],
      };
      return res.status(200).send({ success: true, brandInfos });
    }

    let brandInfo = await redisClient.getAsync('top20BrandInfos');
    if (brandInfo) {
      brandInfo = JSON.parse(brandInfo);
      const brandInfos = {};
      for (let i = 0; i < brandInfo.length; i++) {
        if (name === brandInfo[i].Brand.condensedName) {
          const info = brandInfo[i];
          brandInfos.name = info.Brand.name;
          brandInfos.condensedName = info.Brand.condensedName;
          brandInfos.brandNews = info.brandNews;
          brandInfo.brandSales = info.brandSales;
        }
      }
      return res.status(200).send({ success: true, brandInfos });
    }
  } catch(err) {
    sendError(`retrieving brand ${name} infos`, err, res);
  }
}

module.exports = { retrieveBrandInfos };
