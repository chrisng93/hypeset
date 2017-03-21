/**
 * Created by chrisng on 3/20/17.
 */
import { getInfo } from '../../utils/infoUtils';
import { sendCrudError } from '../../utils/commonErrorHandling';

async function retrieveAllSales(req, res) {
  try {
    const limit = 20;
    let { offset } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    const sales = await getInfo('Sale', offset, limit);
    console.log('Retrieved sales');
    res.status(200).send({ success: true, sales });
  } catch(err) {
    sendCrudError('retrieving', 'all sales', err, res);
  }
}

module.exports = { retrieveAllSales };
