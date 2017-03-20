/**
 * Created by chrisng on 3/20/17.
 */
import express from 'express';
import newsController from './newsController';

const newsRouter = express.Router();

newsRouter.get('/', (req, res) => newsController.retrieveAllNews(req, res));

module.exports = newsRouter;
