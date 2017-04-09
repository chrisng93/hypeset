/**
 * Route handler for authentication
 */

import jwt from 'jsonwebtoken';
import winston from 'winston';
import m from '../../models';
import redisClient from '../../db/redis';
import { checkForSequelizeErrors } from '../../utils/apiUtils';
const logger = winston.loggers.get('auth');

async function authenticate(req, res) {
  const { username, password } = req.body;
  try {
    const user = await m.User.findByUsername(username);
    if (!user) {
      logger.info('User not found', { user: username, action: 'not found' });
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    const valid = user.validatePassword(password);
    if (!valid) {
      logger.info('User password not valid', { user: user.username, action: 'invalid password' });
      return res.status(401).send({ success: false, message: 'Incorrect password combination' });
    }

    const expiration = parseInt(process.env.JWT_EXPIRATION);
    const token = jwt.sign({ user: { ...user.dataValues } }, process.env.JWT_SECRET, { expiresIn: expiration });
    await redisClient.setex(token, expiration, true);
    logger.info('User authenticated', { user: user.username, action: 'authenticate' });
    res.status(200).send({ success: true, token, user });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error authenticating user', { user: username, action: 'authenticate', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function logout(req, res) {
  const { user } = req;
  try {
    await redisClient.del(req.token);
    logger.info('User logged out', { user: user.username, action: 'logout' });
    res.status(200).send({ success: true });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error logging out', { user: user.username, action: 'logout', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function forgot(req, res) {
}

module.exports = { authenticate, logout, forgot };
