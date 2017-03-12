/**
 * Created by chrisng on 3/12/17.
 */

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import pg from 'pg';

const db = {};
const basename = path.basename(module.filename);
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

// create or connect to postgres db
let sequelize;
const pgConnectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/postgres`;

pg.connect(pgConnectionString, (error, client) => {
  // create the db and ignore any errors (for example if it already exists)
  client.query(`CREATE DATABASE ${DB_NAME}`, (err) => {
    if (err && err.code === '42P04') console.log('Database already exists');
    if (!err) console.log('Database created');

    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
    });

    fs.readdirSync(__dirname)
      .filter(file => (file.indexOf('.') !== 0) && (file !== basename))
      .forEach((file) => {
        if (file.slice(-3) !== '.js') return;
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
        // create table in postgres that maps to given model
        model.sync();
      });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  });
});

module.exports = db;
