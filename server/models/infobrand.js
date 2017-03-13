module.exports = (sequelize, DataTypes) => {
  const InfoBrand = sequelize.define('InfoBrand', {
    infoId: {
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
  return InfoBrand;
};
