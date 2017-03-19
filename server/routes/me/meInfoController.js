/**
 * Created by chrisng on 3/15/17.
 */
import m from '../../models';

async function getOwnNews(req, res) {
  try {
    const { offset } = this.params;
    const limit = 20;
    let news = [];
    const user = await m.User.find({ where: { id: req.user.id }, include: [{ model: m.Brand }] });
    for (let i = 0; i < user.Brands.length; i++) {
      const query = {
        where: { type: 'News' },
        include: [
          { model: m.Brand, where: { id: user.Brands[i].id } },
          { model: m.Site },
        ],
        limit,
        offset,
      };
      const relevantArticles = await m.Info.findAll(query);
      news = news.concat(relevantArticles);
    }
    res.status(200).send({ success: true, news });
  } catch(err) {
    console.error(`Error retrieving news for user ${req.user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function getOwnSales(req, res) {
  try {
    const { offset } = this.params;
    const limit = 20;
    let sales = [];
    const user = await m.User.find({ where: { id: req.user.id }, include: [{ model: m.Brand }] });
    for (let i = 0; i < user.Brands.length; i++) {
      const query = {
        where: { type: 'Sale' },
        include: [
          { model: m.Brand, where: { id: user.Brands[i].id } },
          { model: m.Site },
        ],
        limit,
        offset,
      };
      const relevantArticles = await m.Info.findAll(query);
      sales = sales.concat(relevantArticles);
    }
    res.status(200).send({ success: true, sales });
  } catch(err) {
    console.error(`Error retrieving sales for user ${req.user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { getOwnNews, getOwnSales };
