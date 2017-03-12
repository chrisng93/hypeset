'use strict';
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    classMethods: {
      findById: function(id) {
        return this.find({ where: { id } });
      }
    },
    instanceMethods: {
      generateHash: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
      validatePassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
    }
  });

  User.beforeValidate((usr) => {
    const hashSaltPassword = usr.generateHash(usr.password);
    usr.password = hashSaltPassword;
    return sequelize.Promise.resolve(usr);
  });

  return User;
};
