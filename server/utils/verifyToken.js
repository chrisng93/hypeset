/**
 * Created by chrisng on 3/12/17.
 */
import jwt from 'jsonwebtoken';

function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

export default function verifyToken(req, res, next) {
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
}
