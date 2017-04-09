/**
 * Utils for Redis caching
 */

import winston from 'winston';
import m from '../models';
import redisClient from '../db/redis';

const redisLogger = winston.loggers.get('redis');
const infoLogger = winston.loggers.get('infoApi');

export async function setRedisKeys() {
  try {
    // set all brands, top 40 news articles, top 40 sales articles, top brand popularities, top 20 news and sales for top brand popularities
    await setTop40News();
    await setTop40Sales();
    await setTop20BrandsAndInfos();
    await setAllBrands();
  } catch(err) {
    redisLogger.error('Error setting Redis keys', { err: JSON.stringify(err.message) });
  }
}

export async function setTop40News() {
  try {
    const top40News = await m.Info.findAll(createInfoQuery('News'));
    await redisClient.set('top40News', JSON.stringify(top40News));
  } catch(err) {
    redisLogger.error('Error setting Redis top 40 news cache', { err: JSON.stringify(err.message) });
  }
}

export async function setTop40Sales() {
  try {
    const top40Sales = await m.Info.findAll(createInfoQuery('Sale'));
    await redisClient.set('top40Sales', JSON.stringify(top40Sales));
  } catch(err) {
    redisLogger.error('Error setting Redis top 40 sales cache', { err: JSON.stringify(err.message) });
  }
}

export async function setTop20BrandsAndInfos() {
  try {
    const top20Brands = await m.BrandPopularity.findAll({
      attributes: { exclude: ['date', 'batch', 'createdAt', 'updatedAt'] },
      include: [{ model: m.Brand, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
      limit: 20,
      order: [[{ raw: 'batch DESC, count DESC' }]]
    });
    const top20BrandInfos = {};
    for (let i = 0; i < top20Brands.length; i++) {
      const currBrand = top20Brands[i].Brand;
      top20BrandInfos[currBrand.condensedName] = await getInfoForBrand(currBrand.id);
      top20BrandInfos[currBrand.condensedName].name = currBrand.name;
    }
    await redisClient.set('top20Brands', JSON.stringify(top20Brands));
    await redisClient.set('top20BrandInfos', JSON.stringify(top20BrandInfos));
  } catch(err) {
    redisLogger.error('Error setting Redis top 20 brands and brand infos caches', { err: JSON.stringify(err.message) });
  }
}

export async function setAllBrands() {
  try {
    const allBrands = await m.Brand.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [[m.sequelize.fn('lower', m.sequelize.col('name')), 'ASC']],
    });
    await redisClient.set('allBrands', JSON.stringify(allBrands));
  } catch(err) {
    redisLogger.error('Error setting Redis all brands cache', { err: JSON.stringify(err.message) });
  }
}

const createInfoQuery = (type) => {
  return {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { type },
    include: [
      { model: m.Brand, attributes: ['name'] },
      { model: m.Site, attributes: ['name'] },
    ],
    limit: 40,
    order: 'date DESC'
  }
};

async function getInfoForBrand(brandId) {
  try {
    const brandNews = await m.Info.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { type: 'News' },
      include: [{
        model: m.Brand,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { id: brandId } }],
      limit: 20,
      subQuery: false,
      order: 'date DESC',
    });
    const brandSales = await m.Info.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { type: 'Sale' },
      include: [{
        model: m.Brand,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { id: brandId } }],
      limit: 20,
      subQuery: false,
      order: 'date DESC',
    });
    return { brandNews: brandNews || [], brandSales: brandSales || [] };
  } catch(err) {
    infoLogger.warn('Error retrieving info for brand', { brand: brandId, action: 'retrieve' });
  }
}
