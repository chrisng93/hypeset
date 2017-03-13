/**
 * Created by chrisng on 3/12/17.
 */
import jwt from 'jsonwebtoken';
import models from '../../models';

async function authenticate(req, res) {
  const { username, password } = req.body;
  try {
    const user = await models.User.findByUsername(username);
    if (!user) {
      return res.status(403).send({ success: false, message: 'Username not found' });
    }

    const valid = user.validatePassword(password);
    if (!valid) {
      return res.status(403).send({ success: false, message: 'Incorrect password combination' });
    }

    const token = jwt.sign({ user: {...user.dataValues} }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    console.log(`User ${user.id} successfully authenticated`);
    res.status(200).send({ success: true, token });
  } catch(err) {
    console.log(`Error authenticating username ${username}`);
    res.status(500).send({ success: false, error: err.errors });
  }
}

module.exports = { authenticate };
