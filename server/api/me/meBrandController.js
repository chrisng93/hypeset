/**
 * Created by chrisng on 3/12/17.
 */
import winston from 'winston';
import m from '../../models';
import { checkForSequelizeErrors } from '../../utils/apiUtils';
const logger = winston.loggers.get('meApi');

async function getOwnBrands(req, res) {
  try {
    const query = {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      where: { id: req.user.id },
      include: [{
        model: m.Brand,
        attributes: ['name'],
        order: [[m.sequelize.fn('lower', m.sequelize.col('name')), 'ASC']],
      }],
    };
    const user = await m.User.find(query);
    logger.debug('User brands retrieved', { user: user.username, type: 'Brands', action: 'retrieve' });
    res.status(200).send({ success: true, brands: user.Brands });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error retrieving user brands', { user: req.user.username, type: 'Brands', action: 'retrieve', err: message });
    res.status(500).send({ success: false, message });
  }
}

// TODO: do we need to check for successful/failed - update/delete?
async function updateOwnBrands(req, res) {
  const { brands } = req.body;
  try {
    const user = await m.User.findById(req.user.id);
    const successfulInserts = [];
    for (let i = 0; i < brands.length; i++) {
      const brand = await m.Brand.findByName(brands[i]);
      if (brand) {
        user.addBrand(brand);
        successfulInserts.push(brand);
      }
    }
    logger.debug('User brands successfully updated', { user: user.username, type: 'Brands', action: 'update' });
    res.status(200).send({ success: true, successfulInserts });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error updating user brands', { user: req.user.username, type: 'Brands', action: 'update', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function deleteOwnBrands(req, res) {
  const { brands } = req.body;
  try {
    const user = await m.User.findById(req.user.id);
    const successfulDeletes = [];
    for (let i = 0; i < brands.length; i++) {
      const brand = await m.Brand.findByName(brands[i]);
      const hasAssociation = await user.hasBrand(brand);
      if (brand && hasAssociation) {
        user.removeBrand(brand);
        successfulDeletes.push(brands[i]);
      }
    }
    logger.debug('User brands successfully deleted', { user: user.username, type: 'Brands', action: 'delete' });
    res.status(200).send({ success: true, successfulDeletes });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error deleting user brands', { user: req.user.username, type: 'Brands', action: 'delete', err: message });
    res.status(500).send({ success: false, message });
  }
}

module.exports = { getOwnBrands, updateOwnBrands, deleteOwnBrands };
