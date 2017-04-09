/**
 * Define /auth routes
 */

import express from 'express';
import authController from './authController';

const authRouter = express.Router();

authRouter.post('/', (req, res) => authController.authenticate(req, res));
authRouter.post('/logout', (req, res) => authController.logout(req, res));
authRouter.post('/forgot', (req, res) => authController.forgot(req, res));

module.exports = authRouter;
