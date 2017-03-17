module.exports = (sequelize, DataTypes) => {
  const UserBrand = sequelize.define('UserBrand', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BrandId: {
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
