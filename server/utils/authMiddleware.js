/**
 * Created by chrisng on 3/12/17.
 */
import jwt from 'jsonwebtoken';

const checkPath = (req, res, next) => {
  const nonSecurePaths = ['/auth'];
  const nonSecurePosts = ['/api/user'];

  if (nonSecurePaths.indexOf(req.path) >= 0 || (req.method === 'POST' && nonSecurePosts.indexOf(req.path) >= 0)) {
    req.unsecured = true;
    return next();
  }
  return next();
};

const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const verifyToken = (req, res, next) => {
  if (req.unsecured) {
    return next();
  }

  const token = getToken(req);
  if (!token) {
    return res.status(403).send({ success: false, message: 'Invalid token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ success: false, message: err });
    }
    req.user = decoded.user;
    return next();
  });
};

module.exports = { checkPath, verifyToken };
