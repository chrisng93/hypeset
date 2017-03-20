/**
 * Created by chrisng on 3/12/17.
 */
import m from '../../models';
import { sendCrudError } from '../../utils/commonErrorHandling';

async function createBrand(req, res) {
  try {
    const brand = await m.Brand.create(req.body);
    console.log(`Created brand ${brand.name}`);
    res.status(201).send({ success: true, brand });
  } catch(err) {
    sendCrudError('creating', 'brand', err, res);
  }
}

async function retrieveAllBrands(req, res) {
  try {
    const query = {
      attributes: ['name', 'condensedName'],
      order: [[m.sequelize.fn('lower', m.sequelize.col('name')), 'ASC']],
    };
    const brands = await m.Brand.findAll(query);
    console.log('Retrieved all brands');
    res.status(200).send({ success: true, brands });
  } catch(err) {
    sendCrudError('retrieving', 'brands', err, res);
  }
}

async function retrieveBrand(req, res) {
  const { name } = req.params;
  try {
    const brand = await m.Brand.findByName(name);
    if (!brand) {
      console.error(`Brand ${name} not found`);
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    console.log(`Retrieve brand ${name}`);
    res.status(200).send({ success: true, brand });
  } catch(err) {
    sendCrudError('retrieving', 'brand', err, res);
  }
}

async function updateBrand(req, res) {
  const { name } = req.params;
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const brand = await m.Brand.findByName(name);
    if (!brand) {
      console.error(`Brand ${name} not found`);
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    await brand.update({ ...req.body });
    console.log(`Updated brand ${name}`);
    res.status(200).send({ success: true, brand });
  } catch(err) {
    sendCrudError('updating', 'brand', err, res);
  }
}

async function deleteBrand(req, res) {
  const { name } = req.params;
  if (req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const brand = await m.Brand.findByName(name);
    if (!brand) {
      console.error(`Brand ${name} not found`);
      return res.status(404).send({ success: false, message: `Brand ${name} not found` });
    }

    await brand.destroy({ force: true });
    res.status(200).send({ success: true });
  } catch(err) {
    sendCrudError('deleting', 'brand', err, res);
  }
}

module.exports = { createBrand, retrieveAllBrands, retrieveBrand, updateBrand, deleteBrand };
