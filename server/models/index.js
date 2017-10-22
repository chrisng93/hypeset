/**
 * Connect to Postgres, create tables from models, and create sites/admin account
 */

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import pg from 'pg';
import winston from 'winston';

const logger = winston.loggers.get('postgres');
const db = {};
const basename = path.basename(module.filename);
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const pgConnectionString = process.env.NODE_ENV === 'production' ? `postgres://postgres:5432/${DB_NAME}` : `postgres://${DB_HOST}:5432/${DB_NAME}`;

// create or connect to postgres db
pg.connect(pgConnectionString, (dbConnectError, client) => {
  if (dbConnectError) {
    logger.error('Error connecting to Postgres', { action: 'connect', err: JSON.stringify(dbConnectError) });
    throw new Error(`Error connecting to Postgres: ${JSON.stringify(dbConnectError)}`);
  }

  // create the db and ignore any errors (for example if it already exists)
  client.query(`CREATE DATABASE ${DB_NAME}`, (createDbError) => {
    if (createDbError && createDbError.code === '42P04') logger.debug('Database already exists', { action: 'attempted create' });
    if (!createDbError) logger.debug('Database created', { action: 'create' });

    const sequelize = new Sequelize(pgConnectionString, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
      logging: false,
    });

    fs.readdirSync(__dirname)
      .filter(file => (file.indexOf('.') !== 0) && (file !== basename))
      .forEach((file) => {
        if (file.slice(-3) !== '.js') return;
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
      });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    sequelize
      .sync()
      .then(() => {
        // populate table with Grailed and Hypebeast sites
        db.Site.findOrCreate({ where: { name: 'Grailed' }, defaults: { name: 'Grailed', url: process.env.GRAILED_URL } });
        db.Site.findOrCreate({ where: { name: 'Hypebeast' }, defaults: { name: 'Hypebeast', url: process.env.HYPEBEAST_URL } });
        db.Site.findOrCreate({ where: { name: 'Reddit' }, defaults: { name: 'Reddit', url: process.env.REDDIT_URL } });

        // create admin
        db.User.findOrCreate({ where: { role: 'Admin' }, defaults: { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD, role: 'Admin' } });
      })
      .catch((err) => {
        logger.warn('Error syncing Postgres models', { action: 'sync', err: JSON.stringify(err) });
      });
  });
});

module.exports = db;
