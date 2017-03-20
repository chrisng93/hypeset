/**
 * Created by chrisng on 3/17/17.
 */
import m from '../../models';
import { sendCrudError } from '../../utils/commonErrorHandling';

async function retrieveBrandsByPopularity(req, res) {
  try {
    const query = {
      attributes: ['brandName', 'count', 'date'],
      order: [[{ raw: 'batch DESC, count DESC' }]],
      limit: req.query.limit,
    };
    const brandsByPopularity = await m.BrandPopularity.findAll(query);
    console.log('Retrieved brands by popularity');
    res.status(200).send({ success: true, brandsByPopularity });
  } catch(err) {
    sendCrudError('retrieving', 'brand popularities', err, res);
  }
}

module.exports = { retrieveBrandsByPopularity };
