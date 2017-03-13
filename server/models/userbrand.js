module.exports = (sequelize, DataTypes) => {
  const UserBrand = sequelize.define('UserBrand', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        models.User.belongsToMany(models.Brand, { through: UserBrand, foreignKey: 'name' });
        models.Brand.belongsToMany(models.User, { through: UserBrand, foreignKey: 'username' });
      },
    },
  });
  return UserBrand;
};
