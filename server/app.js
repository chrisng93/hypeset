import express from 'express';
import winston from 'winston';
import { checkPath, verifyToken } from './utils/authMiddleware';

require('dotenv').config({ path: './.env' });

const app = express();

// initial config static assets
require('./config/initialize')(app);

// set up logging
require('./config/winston')(winston);

// set up db
require('./models');

// set up redis
require('./db/redis');

// set up routes
app.all('*', checkPath);
app.all('*', verifyToken);
require('./api/routes')(app);

app.get('/*', (req, res) => {
  res.status(404).send('Route not found');
});

const logger = winston.loggers.get('app');

app.listen(process.env.PORT, () => {
  logger.info(`Listening on ${process.env.PORT}..`);

  require('./scripts/cronScript');
});

module.exports = app;
