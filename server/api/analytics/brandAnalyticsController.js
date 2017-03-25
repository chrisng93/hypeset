/**
 * Created by chrisng on 3/17/17.
 */
import winston from 'winston';
import m from '../../models';
import redisClient from '../../db/redis';
import { checkForSequelizeErrors } from '../../utils/apiUtils';
const logger = winston.loggers.get('analyticsApi');

async function retrieveBrandsByPopularity(req, res) {
  try {
    const cachedTopBrands = await redisClient.getAsync('top20Brands');
    if (cachedTopBrands) {
      logger.debug('Brands by popularity retrieved from Redis cache', { action: 'retrieve' });
      return res.status(200).send({ success: true, brandsByPopularity: JSON.parse(cachedTopBrands) });
    }

    const query = {
      attributes: ['brandName', 'count', 'date'],
      order: [[{ raw: 'batch DESC, count DESC' }]],
      limit: req.query.limit,
    };
    const brandsByPopularity = await m.BrandPopularity.findAll(query);
    logger.debug('Brands by popularity retrieved', { action: 'retrieve' });
    res.status(200).send({ success: true, brandsByPopularity });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error retrieving brands by popularity', { action: 'retrieve', err: message });
    res.status(500).send({ success: false, message });
  }
}

module.exports = { retrieveBrandsByPopularity };
