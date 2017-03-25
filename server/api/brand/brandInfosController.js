/**
 * Created by chrisng on 3/21/17.
 */
import winston from 'winston';
import m from '../../models';
import redisClient from '../../db/redis';
const logger = winston.loggers.get('brandApi');

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
  offset ? offset = parseInt(offset) : offset = 0;
  limit ? limit = parseInt(limit) : limit = 20;
  try {
    let cachedTopBrands = await redisClient.getAsync('top20Brands');
    cachedTopBrands = JSON.parse(cachedTopBrands) || [];
    const topBrandCondensedNames = cachedTopBrands.map(brandModel => brandModel.Brand.condensedName);
    let index = topBrandCondensedNames.indexOf(name);

    if (index < 0) {
      const newsQuery = createBrandInfoQuery('News', name, offset, limit);
      const salesQuery = createBrandInfoQuery('Sale', name, offset, limit);
      const brand = await m.Brand.find({ attributes: ['name', 'condensedName'], where: { condensedName: name } });
      const brandNews = await m.Brand.find(newsQuery) || {};
      const brandSales = await m.Brand.find(salesQuery) || {};
      const brandInfos = {
        brandName: brand.name,
        brandCondensedName: brand.condensedName,
        brandNews: brandNews.Infos || [],
        brandSales: brandSales.Infos || [],
      };
      logger.debug('Brand infos retrieved', { brand: brand.name, type: 'Infos', action: 'retrieve', offset, limit });
      return res.status(200).send({ success: true, brandInfos });
    }

    let brandInfo = await redisClient.getAsync('top20BrandInfos');
    if (offset === 0 && limit === 20 && brandInfo) {
      brandInfo = JSON.parse(brandInfo);
      const info = brandInfo[name];
      const brandInfos = {
        brandName: info.name,
        brandCondensedName: name,
        brandNews: info.brandNews,
        brandSales: info.brandSales,
      };
      logger.debug('Brand infos retrieved from Redis cache', { brand: brandInfos.name, type: 'Infos', action: 'retrieve', offset, limit });
      return res.status(200).send({ success: true, brandInfos });
    }
  } catch(err) {
    logger.warn('Error retrieving brand infos', { brand: name, type: 'Infos', action: 'retrieve', offset, limit, err: JSON.stringify(err) });
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { retrieveBrandInfos };
