/**
 * Authentication middleware for requests
 */

import jwt from 'jsonwebtoken';
import winston from 'winston';
import redisClient from '../db/redis';
const logger = winston.loggers.get('auth');

const checkPathAgainstUnsecured = (unsecured, path) => {
  let found = -1;
  for (let i = 0; i < unsecured.length; i++) {
    const endpoint = unsecured[i];
    if (path === endpoint ||
      (endpoint[endpoint.length - 1] === '*' && path.slice(0, endpoint.length - 2) === endpoint.slice(0, endpoint.length - 2))) {
      found = i;
    }
  }
  return found;
};

export const checkPath = (req, res, next) => {
  const unsecuredGets = ['/auth', '/api/brand', '/api/brand/*', '/api/analytics/brand/popularity',
    '/api/site', '/api/user/*', '/api/news', '/api/sales', '/api/brand/info'];
  const unsecuredPosts = ['/auth', '/api/user'];

  if ((req.method === 'POST' && checkPathAgainstUnsecured(unsecuredPosts, req.path) >= 0) ||
    (req.method === 'GET' && checkPathAgainstUnsecured(unsecuredGets, req.path) >= 0)) {
    logger.debug('Route marked as unsecured', { path: req.path });
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

export const verifyToken = (req, res, next) => {
  if (req.unsecured) {
    return next();
  }

  const token = getToken(req);
  if (!token) {
    logger.info('Invalid token', { token });
    return res.status(403).send({ success: false, message: 'Invalid token' });
  }

  redisClient.get(token, (redisErr, reply) => {
    if (redisErr) return res.status(500).send({ success: false, message: JSON.stringify(redisErr) });
    if (!reply) {
      logger.info('Invalid token', { token });
      return res.status(403).send({ success: false, message: 'Invalid token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (jwtErr, decoded) => {
      if (jwtErr) return res.status(403).send({ success: false, message: jwtErr });
      req.user = decoded.user;
      req.token = token;
      return next();
    });
  });
};
