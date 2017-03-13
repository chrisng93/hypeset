/**
 * Created by chrisng on 3/12/17.
 */
import express from 'express';
import crudController from './crudController';

const userRouter = express.Router();

userRouter.post('/', (req, res) => crudController.createUser(req, res));
userRouter.get('/:id', (req, res) => crudController.retrieveUser(req, res));
userRouter.put('/:id', (req, res) => crudController.updateUser(req, res));
userRouter.delete('/:id', (req, res) => crudController.deleteUser(req, res));

module.exports = userRouter;
