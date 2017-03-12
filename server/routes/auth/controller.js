/**
 * Created by chrisng on 3/12/17.
 */
import models from '../../models';

async function authenticate(req, res) {
  const { username, password } = req.body;
  const user = await models.User.find({ where: { username } });
  const valid = user.validatePassword(password);

  if (!valid) {
    return res.status(403).send();
  }
  res.status(200).send();
}

module.exports = { authenticate };
