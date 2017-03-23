/**
 * Created by chrisng on 3/15/17.
 */
import m from '../../models';
import { sendError } from '../../utils/commonErrorHandling';

async function getOwnInfo(userId, type, offset, limit, res) {
  try {
    const user = await m.User.find({ where: { id: userId }, include: [{ model: m.Brand }] });
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
    sendError('retrieving info', err, res);
  }
}

async function getOwnNews(req, res) {
  try {
    let { offset, limit } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    limit ? limit = parseInt(limit) : limit = 20;
    const news = await getOwnInfo(req.user.id, 'News', offset, limit, res);
    res.status(200).send({ success: true, news });
  } catch(err) {
    sendError(`retrieving news for user ${req.user.username}`, err, res);
  }
}

async function getOwnSales(req, res) {
  try {
    let { offset, limit } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    limit ? limit = parseInt(limit) : limit = 20;
    const sales = await getOwnInfo(req.user.id, 'Sale', offset, limit, res);
    res.status(200).send({ success: true, sales });
  } catch(err) {
    sendError(`retrieving sales for user ${req.user.username}`, err, res);
  }
}

module.exports = { getOwnNews, getOwnSales };
