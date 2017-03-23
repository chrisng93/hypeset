/**
 * Created by chrisng on 3/12/17.
 */
import jwt from 'jsonwebtoken';
import m from '../../models';
import redisClient from '../../db/redis';
import { sendError } from '../../utils/commonErrorHandling';

async function createUser(req, res) {
  try {
    const user = await m.User.create(req.body);
    const expiration = parseInt(process.env.JWT_EXPIRATION);
    const token = jwt.sign({ user: { ...user.dataValues } }, process.env.JWT_SECRET, { expiresIn: expiration });
    await redisClient.setex(token, expiration, true);
    console.log(`User ${user.username} successfully created`);
    res.status(201).send({ success: true, token, user });
  } catch(err) {
    sendError('creating user', err, res);
  }
}

async function retrieveUser(req, res) {
  const { username } = req.params;
  try {
    const user = await m.User.findByUsername(username);
    if (!user) {
      console.error(`User ${username} not found`);
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    console.log(`Retrieved user ${username}`);
    res.status(200).send({ success: true, user });
  } catch(err) {
    sendError(`retrieving user ${username}`, err, res);
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
      console.error(`User ${username} not found`);
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    await user.update({ ...req.body });
    console.log(`Updated user ${username}`);
    res.status(200).send({ success: true, user });
  } catch(err) {
    sendError(`updating user ${username}`, err, res);
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
      console.error(`User ${username} not found`);
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    await user.destroy({ force: true });
    res.status(200).send({ success: true });
  } catch(err) {
    sendError(`deleting user ${username}`, err, res);
  }
}


module.exports = { createUser, retrieveUser, updateUser, deleteUser };
