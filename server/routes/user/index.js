/**
 * Created by chrisng on 3/12/17.
 */
import express from 'express';
import userController from './controller';

const userRouter = express.Router();

userRouter.post('/', (req, res) => userController.create(req, res));
userRouter.post('/auth', (req, res) => userController.authenticate(req, res));

module.exports = userRouter;
