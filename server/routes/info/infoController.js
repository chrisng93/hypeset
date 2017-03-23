/**
 * Created by chrisng on 3/21/17.
 */
import m from '../../models';
import redisClient from '../../db/redis';
import { sendCrudError } from '../../utils/commonErrorHandling';

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
    sendCrudError('retrieving', 'info', err, res);
  }
}

async function retrieveNews(req, res) {
  try {
    let { offset, limit } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    limit ? limit = parseInt(limit) : limit = 20;

    let cachedNews = await redisClient.getAsync('top40News');
    if (cachedNews && ((offset === 0 && limit === 20) || (offset === 20 && limit === 20))) {
      console.log('RETURNED CAHCED NEWS BITCH')
      offset === 0 && limit === 20 ? cachedNews = JSON.parse(cachedNews).slice(0, 20) : cachedNews = JSON.parse(cachedNews).slice(20);
      return res.status(200).send({ success: true, news: cachedNews });
    }

    const news = await getInfo('News', offset, limit, res);
    console.log('Retrieved news');
    res.status(200).send({ success: true, news });
  } catch(err) {
    sendCrudError('retrieving', 'all news', err, res);
  }
}

async function retrieveSales(req, res) {
  try {
    let { offset, limit } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    limit ? limit = parseInt(limit) : limit = 20;

    let cachedSales = await redisClient.getAsync('top40Sales');
    if (cachedSales && ((offset === 0 && limit === 20) || (offset === 20 && limit === 20))) {
      console.log('RETURNED CAHCED SALES BITCH')
      offset === 0 && limit === 20 ? cachedSales = JSON.parse(cachedSales).slice(0, 20) : cachedSales = JSON.parse(cachedSales).slice(20);
      return res.status(200).send({ success: true, sales: cachedSales });
    }

    const sales = await getInfo('Sale', offset, limit, res);
    console.log('Retrieved sales');
    res.status(200).send({ success: true, sales });
  } catch(err) {
    sendCrudError('retrieving', 'all sales', err, res);
  }
}

module.exports = { retrieveNews, retrieveSales };
