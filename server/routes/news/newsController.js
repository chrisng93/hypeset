/**
 * Created by chrisng on 3/20/17.
 */
import m from '../../models';
import { sendCrudError } from '../../utils/commonErrorHandling';

async function retrieveAllNews(req, res) {
  try {
    let { offset } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    const query = {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { type: 'News' },
      include: [
        { model: m.Brand, attributes: ['name'] },
        { model: m.Site, attributes: ['name'] },
      ],
      order: 'date DESC',
      // limit,
      // offset,
    };
    let news = await m.Info.findAll(query);
    news = news.slice(offset, offset + 20);
    console.log('Retrieved all news');
    res.status(200).send({ success: true, news });
  } catch(err) {
    sendCrudError('retrieving', 'all news', err, res);
  }
}

module.exports = { retrieveAllNews };
