module.exports = (sequelize, DataTypes) => {
  const UserBrand = sequelize.define('UserBrand', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.STRING,
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
