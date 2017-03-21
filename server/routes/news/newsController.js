/**
 * Created by chrisng on 3/20/17.
 */
import { getInfo } from '../../utils/infoUtils';
import { sendCrudError } from '../../utils/commonErrorHandling';

async function retrieveAllNews(req, res) {
  try {
    const limit = 20;
    let { offset } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    console.log(offset, limit)
    const news = await getInfo('News', offset, limit);
    console.log('Retrieved news');
    res.status(200).send({ success: true, news });
  } catch(err) {
    sendCrudError('retrieving', 'all news', err, res);
  }
}

module.exports = { retrieveAllNews };
