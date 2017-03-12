/**
 * Created by chrisng on 3/12/17.
 */
import express from 'express';
import authController from './controller';

const authRouter = express.Router();

authRouter.post('/', (req, res) => authController.authenticate(req, res));

module.exports = authRouter;
