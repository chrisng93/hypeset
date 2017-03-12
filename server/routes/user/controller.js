/**
 * Created by chrisng on 3/12/17.
 */
import models from '../../models';

function create(req, res) {
  const { username, password, email } = req.body;
  models.User.create({ username, password, email })
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send(err));
}

module.exports = { create };
