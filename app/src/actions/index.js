import auth from './authActions';
import signUp from './signUpActions';
import editUser from './editUserActions';
import { getAllBrands, getUserBrands, addBrand, removeBrand } from './brandActions';
import getNews from './newsActions';

module.exports = {
  auth,
  signUp,
  editUser,
  getAllBrands,
  getUserBrands,
  addBrand,
  removeBrand,
  getNews,
};
