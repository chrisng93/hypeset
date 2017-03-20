/**
 * Created by chrisng on 3/20/17.
 */
import express from 'express';
import salesController from './salesController';

const salesRouter = express.Router();

salesRouter.get('/', (req, res) => salesController.retrieveAllSales(req, res));

module.exports = salesRouter;
