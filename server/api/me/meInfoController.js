/**
 * Created by chrisng on 3/15/17.
 */
import winston from 'winston';
import m from '../../models';
const logger = winston.loggers.get('meApi');

async function getOwnInfo(user, type, offset, limit, res) {
  try {
    const brandIds = user.Brands.map(brand => brand.id);
    const query = {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { type },
      include: [
        { model: m.Brand, attributes: ['name'], where: { id: { $in: brandIds } } },
        { model: m.Site, attributes: ['name'], required: true },
      ],
      order: 'date DESC',
      limit,
      offset,
      subQuery: false,
    };
    return await m.Info.findAll(query);
  } catch(err) {
    logger.warn('Error retrieving user info', { user: user.username, type, action: 'retrieve', offset, limit, err: JSON.stringify(err) });
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function getOwnNews(req, res) {
  let { offset, limit } = req.query;
  offset ? offset = parseInt(offset) : offset = 0;
  limit ? limit = parseInt(limit) : limit = 20;
  try {
    const user = await m.User.find({ where: { id: req.user.id }, include: [{ model: m.Brand }] });
    const news = await getOwnInfo(user, 'News', offset, limit, res);
    logger.debug('User news retrieved', { user: user.username, type: 'News', action: 'retrieve', offset, limit });
    res.status(200).send({ success: true, news });
  } catch(err) {
    logger.warn('Error retrieving user news', { user: req.user.username, type: 'News', action: 'retrieve', offset, limit, err: JSON.stringify(err) });
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function getOwnSales(req, res) {
  let { offset, limit } = req.query;
  offset ? offset = parseInt(offset) : offset = 0;
  limit ? limit = parseInt(limit) : limit = 20;
  try {
    const user = await m.User.find({ where: { id: req.user.id }, include: [{ model: m.Brand }] });
    const sales = await getOwnInfo(user, 'Sale', offset, limit, res);
    logger.debug('User sales retrieved', { user: user.username, type: 'Sales', action: 'retrieve', offset, limit });
    res.status(200).send({ success: true, sales });
  } catch(err) {
    logger.warn('Error retrieving user sales', { user: req.user.username, type: 'Sale', action: 'retrieve', offset, limit, err: JSON.stringify(err) });
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { getOwnNews, getOwnSales };
