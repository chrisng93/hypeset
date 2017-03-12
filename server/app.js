import express from 'express';
import env from 'dotenv';

const app = express();

// Load env variables
env.config({ path: './.env' });

// Initial config static assets
require('./config/initialize')(app, express);

// Set up db
require('./models');

// Set up routes
require('./routes/routes')(app);

app.get('/*', (req, res) => {
  res.status(404).send('Route not found');
});

require('./hypebeastScripts.js');

require('./redditScripts.js');

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}...`);
});
