/**
 * Created by chrisng on 3/12/17.
 */
import express from 'express';
import userCrudController from './userCrudController';
import userBrandController from './userBrandController';

const userRouter = express.Router();

userRouter.post('/', (req, res) => userCrudController.createUser(req, res));
userRouter.get('/:username', (req, res) => userCrudController.retrieveUser(req, res));
userRouter.put('/:username', (req, res) => userCrudController.updateUser(req, res));
userRouter.delete('/:username', (req, res) => userCrudController.deleteUser(req, res));

userRouter.get('/me/brand', (req, res) => userBrandController.getOwnBrands(req, res));
userRouter.put('/me/brand', (req, res) => userBrandController.updateOwnBrands(req, res));
userRouter.delete('/me/brand', (req, res) => userBrandController.deleteOwnBrands(req, res));

module.exports = userRouter;
