/**
 * Created by chrisng on 3/12/17.
 */
import express from 'express';
import brandAnalyticsController from './brandAnalyticsController';

const analyticsRouter = express.Router();

analyticsRouter.get('/brand/popularity', (req, res) => brandAnalyticsController.retrieveBrandsByPopularity(req, res));

module.exports = analyticsRouter;
