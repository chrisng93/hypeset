/**
 * Created by chrisng on 3/21/17.
 */
import winston from 'winston';
import m from '../../models';
import redisClient from '../../db/redis';
import { checkForSequelizeErrors } from '../../utils/apiUtils';
const logger = winston.loggers.get('infoApi');

export async function getInfo(type, offset, limit, res) {
  try {
    const query = {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { type },
      include: [
        { model: m.Brand, attributes: ['name'] },
        { model: m.Site, attributes: ['name'] },
      ],
      order: 'date DESC',
      limit,
      offset,
    };
    return await m.Info.findAll(query);
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error retrieving info', { type, action: 'retrieve', offset, limit, err: message });
    res.status(500).send({ success: false, message });
  }
}

async function retrieveNews(req, res) {
  let { offset, limit } = req.query;
  offset ? offset = parseInt(offset) : offset = 0;
  limit ? limit = parseInt(limit) : limit = 20;
  try {
    let cachedNews = await redisClient.getAsync('top40News');
    if (cachedNews && ((offset === 0 && limit === 20) || (offset === 20 && limit === 20))) {
      offset === 0 && limit === 20 ? cachedNews = JSON.parse(cachedNews).slice(0, 20) : cachedNews = JSON.parse(cachedNews).slice(20);
      logger.info('News retrieved from Redis cache', { type: 'News', action: 'retrieve', offset, limit });
      return res.status(200).send({ success: true, news: cachedNews });
    }

    const news = await getInfo('News', offset, limit, res);
    logger.info('News retrieved', { type: 'News', action: 'retrieve', offset, limit });
    res.status(200).send({ success: true, news });
  } catch(err) {
    logger.warn('Error retrieving news', { type: 'News', action: 'retrieve', offset, limit, err: message });
    res.status(500).send({ success: false, message });
  }
}

async function retrieveSales(req, res) {
  let { offset, limit } = req.query;
  offset ? offset = parseInt(offset) : offset = 0;
  limit ? limit = parseInt(limit) : limit = 20;
  try {
    let cachedSales = await redisClient.getAsync('top40Sales');
    if (cachedSales && ((offset === 0 && limit === 20) || (offset === 20 && limit === 20))) {
      offset === 0 && limit === 20 ? cachedSales = JSON.parse(cachedSales).slice(0, 20) : cachedSales = JSON.parse(cachedSales).slice(20);
      logger.info('Sales retrieved from Redis cache', { type: 'Sale', action: 'retrieve', offset, limit });
      return res.status(200).send({ success: true, sales: cachedSales });
    }

    const sales = await getInfo('Sale', offset, limit, res);
    logger.info('Sales retrieved', { type: 'Sale', action: 'retrieve', offset, limit });
    res.status(200).send({ success: true, sales });
  } catch(err) {
    logger.warn('Error retrieving sales', { type: 'Sale', action: 'retrieve', offset, limit, err: message });
    res.status(500).send({ success: false, message });
  }
}

module.exports = { retrieveNews, retrieveSales };
