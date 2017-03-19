/**
 * Created by chrisng on 3/15/17.
 */
import m from '../../models';

async function getOwnNews(req, res) {
  try {
    let { offset } = req.params;
    offset = parseInt(offset);
    const limit = 20;
    const user = await m.User.find({ where: { id: req.user.id }, include: [{ model: m.Brand }] });
    const brandIds = user.Brands.map(brand => brand.id);
    const query = {
      where: { type: 'News' },
      include: [
        { model: m.Brand, where: { id: { $in: brandIds } } },
        { model: m.Site },
      ],
      order: 'date DESC',
      limit,
      offset,
    };
    const news = await m.Info.findAll(query);
    res.status(200).send({ success: true, news });
  } catch(err) {
    console.error(`Error retrieving news for user ${req.user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function getOwnSales(req, res) {
  try {
    let { offset } = req.params;
    offset = parseInt(offset);
    const limit = 20;
    const user = await m.User.find({ where: { id: req.user.id }, include: [{ model: m.Brand }] });
    const brandIds = user.Brands.map(brand => brand.id);
    const query = {
      where: { type: 'Sale' },
      include: [
        { model: m.Brand, where: { id: { $in: brandIds } } },
        { model: m.Site },
      ],
      order: 'date DESC',
      limit,
      offset,
    };
    const sales = await m.Info.findAll(query);
    res.status(200).send({ success: true, sales });
  } catch(err) {
    console.error(`Error retrieving sales for user ${req.user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { getOwnNews, getOwnSales };
