/**
 * Created by chrisng on 3/20/17.
 */
import express from 'express';
import infoController from '../infoController';

const newsRouter = express.Router();

newsRouter.get('/', (req, res) => infoController.retrieveNews(req, res));

module.exports = newsRouter;
