/**
 * Define /api/me routes
 */

import express from 'express';
import meBrandController from './meBrandController';
import meInfoController from './meInfoController';

const meRouter = express.Router();

meRouter.get('/brand', (req, res) => meBrandController.getOwnBrands(req, res));
meRouter.put('/brand', (req, res) => meBrandController.updateOwnBrands(req, res));
meRouter.delete('/brand', (req, res) => meBrandController.deleteOwnBrands(req, res));

meRouter.get('/news', (req, res) => meInfoController.getOwnNews(req, res));
meRouter.get('/sales', (req, res) => meInfoController.getOwnSales(req, res));

module.exports = meRouter;
