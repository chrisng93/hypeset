/**
 * Define /api/site routes
 */

import express from 'express';
import siteCrudController from './siteCrudController';

const siteRouter = express.Router();

siteRouter.post('/', (req, res) => siteCrudController.createSite(req, res));
siteRouter.get('/:name', (req, res) => siteCrudController.retrieveSite(req, res));
siteRouter.put('/:name', (req, res) => siteCrudController.updateSite(req, res));
siteRouter.delete('/:name', (req, res) => siteCrudController.deleteSite(req, res));

module.exports = siteRouter;
