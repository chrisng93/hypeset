/**
 * Created by chrisng on 3/12/17.
 */
import express from 'express';
import brandCrudController from './brandCrudController';

const brandRouter = express.Router();

brandRouter.post('/', (req, res) => brandCrudController.createBrand(req, res));
brandRouter.get('/', (req, res) => brandCrudController.retrieveAllBrands(req, res));
brandRouter.get('/:name', (req, res) => brandCrudController.retrieveBrand(req, res));
brandRouter.put('/:name', (req, res) => brandCrudController.updateBrand(req, res));
brandRouter.delete('/:name', (req, res) => brandCrudController.deleteBrand(req, res));

module.exports = brandRouter;
