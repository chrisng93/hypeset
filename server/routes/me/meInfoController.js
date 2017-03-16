/**
 * Created by chrisng on 3/15/17.
 */
import m from '../../models';

async function getOwnNews(req, res) {
  // TODO: make this for all articles after certain date (use query string)
  try {
    const user = await m.User.find({ where: { id: req.user.id }, include: [m.Brand] });
    for (let i = 0; i < user.Brands.length; i++) {
      console.log('brand', user.Brands[i].id)
      // TODO: FIX THIS SHIT
      const brand = await m.Brands.find({ where: { id: user.Brands[i].id }, include: [{ model: m.Info, where: { type: 'News' } }] });
      console.log('found brand', brand);
    }
    res.send();
  } catch(err) {
    console.error(`Error retrieving news for user ${req.user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { getOwnNews };
