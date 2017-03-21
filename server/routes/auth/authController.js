/**
 * Created by chrisng on 3/12/17.
 */
import jwt from 'jsonwebtoken';
import m from '../../models';
import { retrieveSales } from '../../scripts/sales/retrieveSales';
import { retrieveBrands } from '../../scripts/brands/retrieveBrands';
import { retrieveNews } from '../../scripts/news/retrieveNews';

async function authenticate(req, res) {
  const { username, password } = req.body;
  try {
    const user = await m.User.findByUsername(username);
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    const valid = user.validatePassword(password);
    if (!valid) {
      return res.status(403).send({ success: false, message: 'Incorrect password combination' });
    }

    const token = jwt.sign({ user: { ...user.dataValues } }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    console.log(`User ${user.id} successfully authenticated`);
    res.status(200).send({ success: true, token, user });
  } catch(err) {
    console.error(`Error authenticating username ${username}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function logout(req, res) {
  // TODO: invalidate token (redis?)
  res.send({ success: true });
}

async function test(req, res) {
  try {
    // await retrieveBrands();
    // const brandModels = await m.Brand.findAll();
    // const availableBrands = brandModels.map(model => model.name);
    // await retrieveNews(availableBrands);
    // await retrieveSales(availableBrands);
    // await retrieveSales(availableBrands);
    // const sales = await m.Info.findAll({ where: { type: 'Sale' }, include: [m.Brand] });
    // for (let i = 0; i < sales.length; i++) {
    //   console.log(sales[i])
    //   if (sales[i].Brands.length === 0) {
    //     sales[i].destroy();
    //   }
    // }
  } catch(err) {
    console.log(err)
  }
  res.send()
}

module.exports = { authenticate, logout, test };
