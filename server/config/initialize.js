/**
 * Middleware for requests
 */

import bodyParser from 'body-parser';

module.exports = (app) => {
  // body parser for getting me from post and/or url params
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      return res.status(200).send();
    }

    next();
  });
};
