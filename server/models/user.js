import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const ROLES = ['Admin', 'User'];

  const User = sequelize.define('User', {
    role: {
      type: DataTypes.ENUM,
      values: ROLES,
      defaultValue: ROLES[1],
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (m) => {
        User.belongsToMany(m.Brand, { through: 'UserBrand', foreignKey: 'userId' });
      },
      findById: function(id) {
        return this.find({ where: { id } });
      },
      findByUsername: function(username) {
        return this.find({ where: { username } });
      },
    },
    instanceMethods: {
      generateHash: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
      validatePassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
  });

  User.beforeValidate((usr) => {
    const hashSaltPassword = usr.generateHash(usr.password);
    usr.password = hashSaltPassword;
    return sequelize.Promise.resolve(usr);
  });

  return User;
};
