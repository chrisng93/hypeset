'use strict';
import bcrypt from 'bcrypt-nodejs';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    instanceMethods: {
      generateHash: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
      },
      isValidPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
    }
  });

  User.beforeValidate(function(usr) {
    console.log(usr.generateHash)
    const hashSaltPassword = usr.generateHash(usr.password);
    console.log(hashSaltPassword)
    usr.password = hashSaltPassword;
    console.log(usr)
    return sequelize.Promise.resolve(usr);
  });

  return User;
};
