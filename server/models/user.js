/**
 * Define User model
 */

import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const ROLES = ['Admin', 'User'];

  const User = sequelize.define('User', {
    role: {
      type: DataTypes.ENUM,
      values: ROLES,
      defaultValue: ROLES[1],
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        isEmail: true,
      },
    },
  }, {
    classMethods: {
      associate: (m) => {
        User.belongsToMany(m.Brand, { through: 'UserBrand', foreignKey: 'UserId', onDelete: 'CASCADE' });
        User.belongsToMany(m.Info, { through: 'InfoUser', foreignKey: 'UserId', onDelete: 'CASCADE' });
      },
      findById: function(id) {
        return this.find({ attributes: { exclude: ['createdAt', 'updatedAt'] }, where: { id } });
      },
      findByUsername: function(username) {
        return this.find({ attributes: { exclude: ['createdAt', 'updatedAt'] }, where: { username } });
      },
    },
    instanceMethods: {
      generateHash: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
      validatePassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
  });

  User.beforeValidate((user) => {
    if (user.password && user.password.length < 5) {
      return sequelize.Promise.reject('Password must be at least 5 characters');
    }
    user.password = user.generateHash(user.password);
    return sequelize.Promise.resolve(user);
  });

  return User;
};
