/**
 * Created by chrisng on 3/12/17.
 */
import jwt from 'jsonwebtoken';
import m from '../../models';
import redisClient from '../../db/redis';
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

    const expiration = parseInt(process.env.JWT_EXPIRATION);
    const token = jwt.sign({ user: { ...user.dataValues } }, process.env.JWT_SECRET, { expiresIn: expiration });
    await redisClient.setex(token, expiration, true);
    console.log(`User ${user.username} successfully authenticated`);
    res.status(200).send({ success: true, token, user });
  } catch(err) {
    console.error(`Error authenticating username ${username}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function logout(req, res) {
  try {
    await redisClient.del(req.token);
    res.status(200).send({ success: true });
  } catch(err) {
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function test(req, res) {
  try {
    // await retrieveBrands();
    // const brandModels = await m.Brand.findAll();
    // const availableBrands = brandModels.map(model => model.name);
    // await retrieveNews(availableBrands);
    // await retrieveSales(availableBrands);
    // const sales = await m.Info.findAll({ where: { type: 'Sale' }, include: [m.Brand] });
    // for (let i = 0; i < sales.length; i++) {
    //   sales[i].destroy();
    // }
  } catch(err) {
    console.log(err)
  }
  res.send()
}

module.exports = { authenticate, logout, test };
