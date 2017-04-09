/**
 * Define /api/news routes
 */

import express from 'express';
import infoController from '../infoController';

const newsRouter = express.Router();

newsRouter.get('/', (req, res) => infoController.retrieveNews(req, res));
newsRouter.put('/:id/brands/delete', (req, res) => infoController.deleteBrands(req, res));

module.exports = newsRouter;
