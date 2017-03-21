/**
 * Created by chrisng on 3/21/17.
 */
import m from '../../models';
import { sendCrudError } from '../../utils/commonErrorHandling';

export async function getInfo(type, offset, limit) {
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
}

async function retrieveNews(req, res) {
  try {
    let { offset, limit } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    limit ? limit = parseInt(limit) : limit = 20;
    const news = await getInfo('News', offset, limit);
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
    const sales = await getInfo('Sale', offset, limit);
    console.log('Retrieved sales');
    res.status(200).send({ success: true, sales });
  } catch(err) {
    sendCrudError('retrieving', 'all sales', err, res);
  }
}

module.exports = { retrieveNews, retrieveSales };
