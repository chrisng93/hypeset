/**
 * Created by chrisng on 3/12/17.
 */
import winston from 'winston';
import m from '../../models';
import redisClient from '../../db/redis';
import { checkForSequelizeErrors } from '../../utils/apiUtils';
const logger = winston.loggers.get('brandApi');

async function createBrand(req, res) {
  try {
    const brand = await m.Brand.checkOrCreate(req.body.name, true);
    logger.debug('Brand created', { brand: brand.name, action: 'create' });
    res.status(201).send({ success: true, brand });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error creating brand', { brand: req.body.name,  action: 'create', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function retrieveAllBrands(req, res) {
  try {
    const cachedAllBrands = await redisClient.getAsync('allBrands');
    if (cachedAllBrands && JSON.parse(cachedAllBrands).length) {
      logger.debug('All brands retrieved from Redis cache', { action: 'retrieve' });
      return res.status(200).send({ success: true, brands: JSON.parse(cachedAllBrands) });
    }

    const query = {
      attributes: ['name', 'condensedName'],
      order: [[m.sequelize.fn('lower', m.sequelize.col('name')), 'ASC']],
    };
    const brands = await m.Brand.findAll(query);
    logger.debug('All brands retrieved', { action: 'retrieve' });
    res.status(200).send({ success: true, brands });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error retrieving all brands', { action: 'retrieve', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function retrieveBrand(req, res) {
  const { name } = req.params;
  try {
    const brand = await m.Brand.find({ where: { condensedName: name } });
    if (!brand) {
      logger.info('Brand not found', { brand: name, action: 'not found' });
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    logger.debug('Brand retrieved', { brand: brand.name, action: 'retrieve' });
    res.status(200).send({ success: true, brand });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error retrieving brand', { brand: name,  action: 'retrieve', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function updateBrand(req, res) {
  const { name } = req.params;
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const brand = await m.Brand.find({ where: { condensedName: name } });
    if (!brand) {
      logger.info('Brand not found', { brand: name, action: 'not found' });
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    await brand.update({ ...req.body });
    logger.debug('Brand updated', { brand: brand.name, action: 'update' });
    res.status(200).send({ success: true, brand });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error updating brand', { brand: name,  action: 'update', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function deleteBrand(req, res) {
  const { name } = req.params;
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const brand = await m.Brand.find({ where: { condensedName: name } });
    if (!brand) {
      logger.info('Brand not found', { brand: name, action: 'not found' });
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    await brand.destroy({ force: true });
    logger.debug('Brand deleted', { brand: brand.name, action: 'delete' });
    res.status(200).send({ success: true });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error deleting brand', { brand: name,  action: 'delete', err: message });
    res.status(500).send({ success: false, message });
  }
}

module.exports = { createBrand, retrieveAllBrands, retrieveBrand, updateBrand, deleteBrand };
