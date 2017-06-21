/**
 * Route handler for brand-specific news/sales
 */

import winston from 'winston';
import m from '../../models';
import redisClient from '../../db/redis';
import { checkForSequelizeErrors } from '../../utils/apiUtils';
const logger = winston.loggers.get('brandApi');

function createBrandInfoQuery(type, brandId, offset, limit) {
  return {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { type },
    include: [{
      model: m.Brand,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { id: brandId } }],
    offset,
    limit,
    subQuery: false,
    order: 'date DESC',
  };
}


async function retrieveBrandInfos(req, res) {
  const { name } = req.params;
  let { offset, limit } = req.query;
  offset = offset ? parseInt(offset) : 0;
  limit = limit ? parseInt(limit) : 20;

  try {
    let cachedTopBrands = await redisClient.getAsync('top20Brands');
    cachedTopBrands = JSON.parse(cachedTopBrands) || [];
    let brandInfo = await redisClient.getAsync('top20BrandInfos');
    const topBrandCondensedNames = cachedTopBrands.map(brandModel => brandModel.Brand.condensedName);

    if (offset === 0 && limit === 20 && brandInfo && topBrandCondensedNames.indexOf(name) > -1) {
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

    const brand = await m.Brand.find({ attributes: ['id', 'name', 'condensedName'], where: { condensedName: name } });
    const newsQuery = createBrandInfoQuery('News', brand.id, offset, limit);
    const salesQuery = createBrandInfoQuery('Sale', brand.id, offset, limit);
    const brandNews = await m.Info.findAll(newsQuery) || [];
    const brandSales = await m.Info.findAll(salesQuery) || [];
    const brandInfos = {
      brandName: brand.name,
      brandCondensedName: brand.condensedName,
      brandNews: brandNews || [],
      brandSales: brandSales || [],
    };
    logger.debug('Brand infos retrieved', { brand: brand.name, type: 'Infos', action: 'retrieve', offset, limit });
    return res.status(200).send({ success: true, brandInfos });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error retrieving brand infos', { brand: name, type: 'Infos', action: 'retrieve', offset, limit, err: message });
    res.status(500).send({ success: false, message });
  }
}

module.exports = { retrieveBrandInfos };
