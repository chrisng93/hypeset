/**
 * Created by chrisng on 3/20/17.
 */
import m from '../../models';
import { sendCrudError } from '../../utils/commonErrorHandling';

async function retrieveAllSales(req, res) {
  try {
    let { offset } = req.query;
    offset ? offset = parseInt(offset) : offset = 0;
    const query = {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { type: 'Sale' },
      include: [
        { model: m.Brand, attributes: ['name'] },
        { model: m.Site, attributes: ['name'] },
      ],
      order: 'date DESC',
      // limit,
      // offset,
    };
    let sales = await m.Info.findAll(query);
    sales = sales.slice(offset, offset + 20);
    console.log('Retrieved all sales');
    res.status(200).send({ success: true, sales });
  } catch(err) {
    sendCrudError('retrieving', 'all sales', err, res);
  }
}

module.exports = { retrieveAllSales };
