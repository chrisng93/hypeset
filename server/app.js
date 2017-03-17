import express from 'express';
import env from 'dotenv';
import { checkPath, verifyToken } from './utils/authMiddleware';

const app = express();

// load env variables
env.config({ path: './.env' });

// initial config static assets
require('./config/initialize')(app);

// set up db
require('./models');

// set up routes
app.all('*', checkPath);
app.all('*', verifyToken);
require('./routes/routes')(app);

app.get('/*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}...`);
  require('./scripts/cronScript');
});

module.exports = app;
