/**
 * Created by chrisng on 3/15/17.
 */
import m from '../../models';

async function getOwnNews(req, res) {
  // TODO: make this for all articles after certain date (use query string)
  try {
    let news = [];
    const user = await m.User.find({ where: { id: req.user.id }, include: [{ model: m.Brand }] });
    for (let i = 0; i < user.Brands.length; i++) {
      const relevantArticles = await m.Info.findAll({ where: { type: 'News' }, include: [{ model: m.Brand, where: { id: user.Brands[i].id } }, { model: m.Site }] })
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
    let sales = [];
    const user = await m.User.find({ where: { id: req.user.id }, include: [{ model: m.Brand }] });
    for (let i = 0; i < user.Brands.length; i++) {
      const relevantArticles = await m.Info.findAll({ where: { type: 'Sale' }, include: [{ model: m.Brand, where: { id: user.Brands[i].id } }, { model: m.Site }] })
      sales = sales.concat(relevantArticles);
    }
    res.status(200).send({ success: true, sales });
  } catch(err) {
    console.error(`Error retrieving sales for user ${req.user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { getOwnNews, getOwnSales };
