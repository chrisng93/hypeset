/**
 * Created by chrisng on 3/12/17.
 */
import jwt from 'jsonwebtoken';
import models from '../../models';

// TODO: permissions
async function createUser(req, res) {
  const { username, password, email } = req.body;
  try {
    const user = await models.User.create({ username, password, email });
    const token = jwt.sign({ user: {...user.dataValues} }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    console.log(`Created user ${user.id}`);
    res.status(201).send({ success: true, token, user });
  } catch(err) {
    console.log(`Error creating user: ${err.errors[0].message}`);
    res.status(500).send({ success: false, message: err.errors[0].message });
  }
}

async function retrieveUser(req, res) {
  const { id } = req.params;
  try {
    // TODO: don't get all of fields - only necessary ones
    const user = await models.User.findById(id);
    if (!user) {
      console.log(`User ${id} not found`);
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    console.log(`Retrieved user ${id}`);
    res.status(200).send({ success: true, user });
  } catch(err) {
    console.log(`Error retrieving user ${id}: ${err.errors[0].message}`);
    res.status(500).send({ success: false, message: err.errors });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  try {
    const user = await models.User.findById(id);
    if (!user) {
      console.log(`User ${id} not found`);
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    await user.update({ ...req.body });
    res.status(200).send({ success: true });
  } catch(err) {
    console.log(`Error updating user ${id}: ${err.errors[0].message}`);
    res.status(500).send({ success: false, message: err.errors });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await models.User.findById(id);
    if (!user) {
      console.log(`User ${id} not found`);
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    await user.destroy({ force: true });
    res.status(200).send({ success: true });
  } catch(err) {
    console.log(`Error deleting user ${id}: ${err.errors[0].message}`);
    res.status(500).send({ success: false, message: err.errors });
  }
}


module.exports = { createUser, retrieveUser, updateUser, deleteUser };
