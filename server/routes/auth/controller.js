/**
 * Created by chrisng on 3/12/17.
 */
import models from '../../models';

function authenticate(req, res) {
  const { username, password } = req.body;
  res.send();
}

module.exports = { authenticate };
