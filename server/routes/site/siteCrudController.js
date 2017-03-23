/**
 * Created by chrisng on 3/12/17.
 */
import jwt from 'jsonwebtoken';
import m from '../../models';
import { sendError } from '../../utils/commonErrorHandling';

async function createSite(req, res) {
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const site = await m.Site.create(req.body);
    console.log(`Created site ${site.name}`);
    res.status(201).send({ success: true, site });
  } catch(err) {
    sendError('creating site', err, res);
  }
}

async function retrieveSite(req, res) {
  const { name } = req.params;
  try {
    const site = await m.Site.findByName(name);
    if (!site) {
      console.error(`Site ${name} not found`);
      return res.status(404).send({ success: false, message: 'Site not found' });
    }

    console.log(`Retrieved site ${sitename}`);
    res.status(200).send({ success: true, site });
  } catch(err) {
    sendError(`retrieving site ${name}`, err, res);
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
      console.error(`Site ${name} not found`);
      return res.status(404).send({ success: false, message: 'Site not found' });
    }

    await site.update({ ...req.body });
    console.log(`Updated site ${name}`);
    res.status(200).send({ success: true, site });
  } catch(err) {
    sendError(`updating site ${name}`, err, res);
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
      console.error(`Site ${name} not found`);
      return res.status(404).send({ success: false, message: 'Site not found' });
    }

    await site.destroy({ force: true });
    res.status(200).send({ success: true });
  } catch(err) {
    sendError(`deleting site ${name}`, err, res);
  }
}


module.exports = { createSite, retrieveSite, updateSite, deleteSite };
