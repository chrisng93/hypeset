/**
 * User CRUD
 */

import jwt from 'jsonwebtoken';
import winston from 'winston';
import m from '../../models';
import redisClient from '../../db/redis';
import { checkForSequelizeErrors } from '../../utils/apiUtils';
const logger = winston.loggers.get('userApi');

async function createUser(req, res) {
  try {
    if (req.body.role) {
      delete req.body.role;
    }
    const user = await m.User.create(req.body);
    const expiration = parseInt(process.env.JWT_EXPIRATION);
    const token = jwt.sign({ user: { ...user.dataValues } }, process.env.JWT_SECRET, { expiresIn: expiration });
    await redisClient.setex(token, expiration, true);
    logger.debug('User created', { user: user.username, action: 'create' });
    res.status(201).send({ success: true, token, user });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error creating user', { user: req.body.username, action: 'create', err: message });
    res.status(500).send({ success: false, message: message });
  }
}

async function retrieveUser(req, res) {
  const { username } = req.params;
  try {
    const user = await m.User.findByUsername(username);
    if (!user) {
      logger.info('User not found', { user: username, action: 'not found' });
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    logger.debug('User retrieved', { user: user.username, action: 'retrieve'});
    res.status(200).send({ success: true, user });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error retrieving user', { user: username, action: 'retrieve', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function updateUser(req, res) {
  const { username } = req.params;
  if (req.user.username !== username && req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const user = await m.User.findByUsername(username);
    if (!user) {
      logger.info('User not found', { user: username, action: 'not found' });
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    if (req.body.role) {
      delete req.body.role;
    }
    await user.update({ ...req.body });
    logger.debug('User updated', { user: user.username, action: 'update' });
    res.status(200).send({ success: true, user });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error updating user', { user: username, action: 'update', err: message });
    res.status(500).send({ success: false, message });
  }
}

async function deleteUser(req, res) {
  const { username } = req.params;
  if (req.user.username !== username && req.user.role !== 'Admin') {
    return res.status(401).send({ success: false, message: 'Permission denied' });
  }

  try {
    const user = await m.User.findByUsername(username);
    if (!user) {
      logger.info('User not found', { user: username, action: 'not found' });
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    await user.destroy({ force: true });
    logger.info('User destroyed', { user: user.username, action: 'destroy' });
    res.status(200).send({ success: true });
  } catch(err) {
    const message = checkForSequelizeErrors(err);
    logger.warn('Error destroying user', { user: username, action: 'destroy', err: message });
    res.status(500).send({ success: false, message });
  }
}


module.exports = { createUser, retrieveUser, updateUser, deleteUser };
