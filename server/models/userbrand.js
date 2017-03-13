module.exports = (sequelize, DataTypes) => {
  const UserBrand = sequelize.define('UserBrand', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (m) => {
        // associations can be defined here
      },
    },
  });
  return UserBrand;
};