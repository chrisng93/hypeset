/**
 * Created by chrisng on 3/20/17.
 */
import express from 'express';
import infoController from '../infoController';

const salesRouter = express.Router();

salesRouter.get('/', (req, res) => infoController.retrieveSales(req, res));

module.exports = salesRouter;