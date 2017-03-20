/**
 * Created by chrisng on 3/15/17.
 */
import m from '../../models';

async function getInfo(userId, type, offset, limit) {
  const user = await m.User.find({ where: { id: userId }, include: [{ model: m.Brand }] });
  const brandIds = user.Brands.map(brand => brand.id);
  const query = {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { type },
    include: [
      { model: m.Brand, attributes: ['name'], where: { id: { $in: brandIds } } },
      { model: m.Site, attributes: ['name'] },
    ],
    order: 'date DESC',
    // limit,
    // offset,
  };
  return await m.Info.findAll(query);
}

async function getOwnNews(req, res) {
  try {
    let { offset } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    let news = await getInfo(req.user.id, 'News', offset, 20);
    news = news.slice(offset, offset + 20);
    res.status(200).send({ success: true, news });
  } catch(err) {
    console.error(`Error retrieving news for user ${req.user.username}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function getOwnSales(req, res) {
  try {
    let { offset } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    let sales = await getInfo(req.user.id, 'Sale', offset, 20);
    sales = sales.slice(offset, offset + 20);
    res.status(200).send({ success: true, sales });
  } catch(err) {
    console.error(`Error retrieving sales for user ${req.user.username}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { getOwnNews, getOwnSales };
