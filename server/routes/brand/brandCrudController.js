/**
 * Created by chrisng on 3/12/17.
 */
import models from '../../models';
import { sendCrudError } from '../../utils/commonErrorHandling';

async function createBrand(req, res) {
  try {
    const brand = await models.Brand.create(req.body);
    console.log(`Created brand ${brand.name}`);
    res.status(201).send({ success: true, brand });
  } catch(err) {
    sendCrudError('creating', err, res);
  }
}

async function retrieveBrand(req, res) {
  const { name } = req.params;
  try {
    const brand = await models.Brand.findByName(name);
    if (!brand) {
      console.error(`Brand ${name} not found`);
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    console.log(`Retrieve brand ${name}`);
    res.status(200).send({ success: true, brand });
  } catch(err) {
    sendCrudError('retrieving', err, res);
  }
}

async function updateBrand(req, res) {
  const { name } = req.params;
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const brand = await models.Brand.findByName(name);
    if (!brand) {
      console.error(`Brand ${name} not found`);
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    await brand.update({ ...req.body });
    console.log(`Updated brand ${name}`);
    res.status(200).send({ success: true, brand });
  } catch(err) {
    sendCrudError('updating', err, res);
  }
}

async function deleteBrand(req, res) {
  const { name } = req.params;
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const brand = await models.Brand.findByName(name);
    if (!brand) {
      console.error(`Brand ${name} not found`);
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    await brand.destroy({ force: true });
    res.status(200).send({ success: true });
  } catch(err) {
    sendCrudError('deleting', err, res);
  }
}

module.exports = { createBrand, retrieveBrand, updateBrand, deleteBrand };
