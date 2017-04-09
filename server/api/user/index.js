/**
 * Define /api/user routes
 */

import express from 'express';
import userCrudController from './userCrudController';

const userRouter = express.Router();

userRouter.post('/', (req, res) => userCrudController.createUser(req, res));
userRouter.get('/:username', (req, res) => userCrudController.retrieveUser(req, res));
userRouter.put('/:username', (req, res) => userCrudController.updateUser(req, res));
userRouter.delete('/:username', (req, res) => userCrudController.deleteUser(req, res));

module.exports = userRouter;
