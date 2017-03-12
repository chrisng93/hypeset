/**
 * Created by chrisng on 3/12/17.
 */
import express from 'express';
import userController from './controller';

const userRouter = express.Router();

userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.get('/:id', (req, res) => userController.retrieveUser(req, res));
userRouter.put('/:id', (req, res) => userController.updateUser(req, res));
userRouter.delete('/:id', (req, res) => userController.deleteUser(req, res));

module.exports = userRouter;
