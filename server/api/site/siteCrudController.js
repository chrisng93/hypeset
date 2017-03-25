/**
 * Created by chrisng on 3/12/17.
 */
import winston from 'winston';
import m from '../../models';
import { checkForSequelizeErrors } from '../../utils/apiUtils';
const logger = winston.loggers.get('siteApi');

async function createSite(req, res) {
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const site = await m.Site.create(req.body);
    logger.debug('Site created', { site: site.name, action: 'create' });
    res.status(201).send({ success: true, site });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error creating site', { site: req.body.name, action: 'create', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function retrieveSite(req, res) {
  const { name } = req.params;
  try {
    const site = await m.Site.findByName(name);
    if (!site) {
      logger.info('Site not found', { site: name, action: 'not found' });
      return res.status(404).send({ success: false, message: 'Site not found' });
    }

    logger.debug('Site retrieved', { site: site.name, action: 'retrieve' });
    res.status(200).send({ success: true, site });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error retrieving site', { site: name, action: 'retrieve', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function updateSite(req, res) {
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  const { name } = req.params;
  try {
    const site = await m.Site.findByName(name);
    if (!site) {
      logger.info('Site not found', { site: name, action: 'not found' });
      return res.status(404).send({ success: false, message: 'Site not found' });
    }

    await site.update({ ...req.body });
    logger.debug('Site updated', { site: site.name, action: 'update' });
    res.status(200).send({ success: true, site });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error updating site', { site: name, action: 'update', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function deleteSite(req, res) {
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  const { name } = req.params;
  try {
    const site = await m.Site.findByName(name);
    if (!site) {
      logger.info('Site not found', { site: name, action: 'not found' });
      return res.status(404).send({ success: false, message: 'Site not found' });
    }

    await site.destroy({ force: true });
    logger.debug('Site destroyed', { site: site.name, action: 'destroy' });
    res.status(200).send({ success: true });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error destroying site', { site: name, action: 'destroy', err: message });
    res.status(500).send({ success: false, message });
  }
}


module.exports = { createSite, retrieveSite, updateSite, deleteSite };
